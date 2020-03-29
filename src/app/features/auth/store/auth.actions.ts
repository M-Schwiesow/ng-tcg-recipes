import { Action } from '@ngrx/store';

export const AUTHENTICATE_SUCCESS = '[Auth] Authentication Success';
export const LOGOUT = 'LOGOUT';
export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_FAIL = '[Auth] Authentication Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear error';
export const AUTH_AUTO_LOGIN = '[Auth] Auto login';
export const AUTH_AUTO_LOGOUT = '[Auth] Auto logout';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(public payload: {email: string, userId: string, token: string, expirationDate: Date, redirect: boolean}) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: {email: string; password: string}) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload : {email: string, password: string}) {}
}

export class ClearError implements Action { 
  readonly type = CLEAR_ERROR;
}

export class AuthAutoLogin implements Action {
  readonly type = AUTH_AUTO_LOGIN;
}

export class AuthAutoLogout implements Action {
  readonly type = AUTH_AUTO_LOGOUT;
}

export type AuthActions =
 AuthenticateSuccess 
| Logout 
| LoginStart 
| AuthenticateFail 
| SignupStart 
| ClearError 
| AuthAutoLogin;