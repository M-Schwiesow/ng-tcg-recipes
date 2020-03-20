import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  /**
   * Progess note:  It looks as if we are currently not sending a request.
   * Network activity is nil with the current setup.
   */

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1), 
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