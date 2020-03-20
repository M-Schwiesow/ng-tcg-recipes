import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';

export interface FirebaseAuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  // a BehaviorSubject can fire not a stream like a standard Subject, but a sort of snapshot of the current state of a stream.
  // it is a one-time event check
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    // ?key=[API_KEY]
    // api key, shame on you: AIzaSyArA5dHvv6HdYsj_Ukj4qeJqbP0bh5fXJw
    console.log('signup method called with email, password: ', email, password);
    return this.http.post<FirebaseAuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArA5dHvv6HdYsj_Ukj4qeJqbP0bh5fXJw',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError), tap(response => {
        this.handleAuthentication(response.email, response.idToken, response.idToken, +response.expiresIn);
      }));
  }

  login(email: string, password: string) {
    return this.http.post<FirebaseAuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArA5dHvv6HdYsj_Ukj4qeJqbP0bh5fXJw'
    , {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError(this.handleError), tap(response => {
      this.handleAuthentication(response.email, response.idToken, response.idToken, +response.expiresIn);
    }));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if( !userData ) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if(loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
    return;
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured.';
    if(!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch(errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "This email is already registered.";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "Charlie!";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "Woooo";
        break;
    }
    return throwError(errorMessage);
  }

  logout() {
    this.user.next(null);
    // re-route to home
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/auth']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    } , expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    console.log('handleAuthentication called');
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }


}