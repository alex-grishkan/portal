import { Action } from '@ngrx/store';

export class ResetPasswordStart implements Action {
  readonly type = RESETPASSWORD_START;
  constructor(public payload: { idToken: string, password: string }) {}
}

export class ResetPasswordSuccess implements Action {
  readonly type = RESETPASSWORD_SUCCESS;
  constructor(public payload: { email: string, idToken: string, refreshToken:string, expiresIn:string }) {}
}

export class ResetPasswordFail implements Action {
  readonly type = RESETPASSWORD_FAIL;
  constructor(public payload: string) {}
}

export class ResetError implements Action {
  readonly type = RESET_ERROR;
}

export const RESETPASSWORD_START = '[Profile] Reset Password Start';
export const RESETPASSWORD_SUCCESS = '[Profile] Reset Password Success';
export const RESETPASSWORD_FAIL = '[Profile] Reset Password Fail';
export const RESET_ERROR = '[Profile] Reset Error';

export type ProfileActions =
  | ResetPasswordStart
  | ResetPasswordSuccess
  | ResetPasswordFail
  | ResetError;
