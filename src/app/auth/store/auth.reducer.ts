import { createReducer, on } from '@ngrx/store';

import * as AuthActions from '../store/auth.actions';
import { User } from '../user.model';

export interface State {
  user: User;
  authError: string;
  authSpinner: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  authSpinner: false,
};

export const AuthReducer = createReducer(
  initialState,
  on(
    AuthActions.LoginStart,
    AuthActions.ForgotPasswordStart,
    (state) => ({
      ...state,
      user: null,
      authError: null,
      authSpinner: true,
    })
  ),

  on(
    AuthActions.LoginSuccess,
    AuthActions.UpdateUser,
    (state, action) => ({
      ...state,
      user: { email: action.email, userId: action.userId, token: action.token, expirationDate: action.expirationDate },
      authError: null,
      authSpinner: false,
    })
  ),

  on(
    AuthActions.ForgotPasswordSuccess,
    (state) => ({
      ...state,
      user: null,
      authError: null,
      authSpinner: false,
    })
  ),

  on(
    AuthActions.LoginFail,
    (state, action) => ({
        ...state,
        user: null,
        authError: action.errorMessage,
        authSpinner: false,
    })
  ),

  on(
    AuthActions.Logout,
    (state) => ({
      ...state,
      user: null,
      authError: null,
      authSpinner: false,
    })
  ),

  on(
    AuthActions.ResetError,
    (state) => ({
      ...state,
      authError: null
    })
  )
);