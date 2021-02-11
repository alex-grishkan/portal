import { createAction, props } from '@ngrx/store';

export interface user  {
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }

export const LoginStart = createAction(
  '[Auth] Login Start',
  props<{ email: string; password: string }>()
);

export const LoginSuccess = createAction(
  '[Auth] Login Success',
  props<user>()
);

export const LoginFail = createAction(
  '[Auth] Login Fail',
  props<{ errorMessage: string }>()
);

export const UpdateUser = createAction(
  '[Auth] Update User',
  props<user>()
);

export const Logout = createAction(
  '[Auth] Logout'
);

export const ResetError = createAction(
  '[Auth] Reset Error'
);

export const ForgotPasswordStart = createAction(
  '[Auth] Forgot Password Start',
  props<{ email: string }>()
);

export const ForgotPasswordSuccess = createAction(
  '[Auth] Forgot Password Success'
);
