import { User } from './../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  isLoading: boolean;
  tokenExpirationTimer: any;
}

const initialState: State = {
  user: null,
  authError: null,
  isLoading: false,
  tokenExpirationTimer: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const signedInUser = new User(
         action.payload.email,
         action.payload.userId,
         action.payload.token,
         action.payload.expirationDate);
      return {
        ...state,
        user: signedInUser,
        isLoading: false
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        isLoading: true,
        authError: null
      }
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        isLoading: false,
        authError: action.payload
      }
      case AuthActions.CLEAR_ERROR:
        return {
          ...state,
          authError: null
        }
    default:
      return state;
  }
}