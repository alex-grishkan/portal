import { Action } from '@ngrx/store';

export interface user  {
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: user) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: string) {}
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(public payload: user) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class ResetError implements Action {
  readonly type = RESET_ERROR;
}

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const UPDATE_USER = '[Auth] Update User';
export const LOGOUT = '[Auth] Logout';
export const RESET_ERROR = '[Auth] Reset Error';

export type AuthActions =
  | LoginStart
  | LoginSuccess
  | LoginFail
  | UpdateUser
  | Logout
  | ResetError
