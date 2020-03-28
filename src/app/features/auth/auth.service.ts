import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './store/auth.actions';

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
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    } , expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

}