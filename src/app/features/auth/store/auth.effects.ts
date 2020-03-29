import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { FirebaseAuthResponseData } from '../auth.service';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../user.model';


const handleAuthentication = (responseData: FirebaseAuthResponseData) => {
  const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
  const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({email: responseData.email, userId: responseData.localId, token: responseData.idToken, expirationDate: expirationDate, redirect: true});
};

const handleError = (errorResponse: HttpErrorResponse) => {
  console.log('handleError called with errorResponse: ', errorResponse);
  let errorMessage = 'An unknown error occured.';
  if(!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch(errorResponse.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = "This email is already registered.";
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = "Charlie!";
      break;
    case 'INVALID_PASSWORD':
      errorMessage = "Three more days...";
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {

  // note the declaration for actions$ is a standard declaration - the $ symbol is convention for identifying an observable, and not required
  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {}

  /*
  Since authLogin is a continuous stream of ngrx actions, if it ever resolves
  (as observables do) our application will close the subscription
  and we will receive no further updates from this subscription.
  In this instance, if our authLogin subscription closes then
  a user would no longer be able to log in, because our application
  would not receive new login events.
  This is going to lead to some wonky error handling.
  */
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signUpAction: AuthActions.SignupStart) => {
      console.log('signup method called with email, password: ', signUpAction.payload.email, signUpAction.payload.password);
      return this.http.post<FirebaseAuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
        {
          email: signUpAction.payload.email,
          password: signUpAction.payload.password,
          returnSecureToken: true
        }).pipe(
          tap(responseData => {
            this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
          }),
          map(responseData => {
            return handleAuthentication(responseData);
          }), 
          catchError(errorResponse => {
            return handleError(errorResponse);
        })
        );
    }),
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),  // ofType is a pre-built filter for a pipe that will only include the actions with a type matching what we specify
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<FirebaseAuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey
      , {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      }).pipe(
        tap(responseData => {
          this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
        }),
        map(responseData => {
          return handleAuthentication(responseData);
        }), 
        catchError(errorResponse => {
          return handleError(errorResponse);
        })
      );
    })
    );

    @Effect()
    authAutoLogin = this.actions$.pipe(
      ofType(AuthActions.AUTH_AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if( !userData ) {
          return {type: 'This is an unregistered action type'};
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if(loadedUser.token) {
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return new AuthActions.AuthenticateSuccess({
            email: userData.email,
            userId: userData.id,
            token: userData._token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false
          });
        }
        return {type: 'This is an unregistered action type'};
      })
    );

    @Effect({dispatch: false})
    authRedirect = this.actions$.pipe(
      ofType(AuthActions.AUTHENTICATE_SUCCESS), 
      tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
        if(authSuccessAction.payload.redirect){
          this.router.navigate(['/']);
        }
    }));

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    }));

}