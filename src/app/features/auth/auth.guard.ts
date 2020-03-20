import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   boolean 
   | UrlTree
   | Promise<boolean> 
   | Observable<boolean 
   | UrlTree> {
    // this takes the observable returned by our authService (of type User) and transforms into an observable of type boolean.  huzzah!
    // Yikes that's a lot of return types.  How safe are we, exactly?  At least it is not any.  On false, returns a route to take us to auth page.
    return this.authService.user
      .pipe(take(1), map(user => {
        if(!!user) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
      );
  }
}