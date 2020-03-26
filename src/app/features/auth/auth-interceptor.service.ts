import * as fromApp from './../store/app.reducer';
import { Store } from '@ngrx/store';
import { take, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // return this.authService.user.pipe(
      return this.store.select('auth').pipe(
      take(1), 
      map(authState => authState.user),
      exhaustMap(user => {
        if(!user) {
          return next.handle(request);
        }
        const modifiedRequest = request.clone({params: new HttpParams().set('auth', user.token)});
        console.log('AuthInterceptor with modified request: ', modifiedRequest);
        return next.handle(modifiedRequest);
    })
    );
  }
}