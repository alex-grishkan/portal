import { Action } from '@ngrx/store';

export class ResetAuthStart implements Action {
  readonly type = RESETAUTH_START;
  constructor(public payload: { idToken: string, email: string, password: string }) {}
}

export class ResetAuthSuccess implements Action {
  readonly type = RESETAUTH_SUCCESS;
  constructor(public payload: { email: string, localId: string, idToken: string, refreshToken:string, expiresIn:string }) {}
}

export class ResetAuthFail implements Action {
  readonly type = RESETAUTH_FAIL;
  constructor(public payload: string) {}
}

export class DropError implements Action {
  readonly type = DROP_ERROR;
}

export const RESETAUTH_START = '[Profile] Reset Auth Start';
export const RESETAUTH_SUCCESS = '[Profile] Reset Auth Success';
export const RESETAUTH_FAIL = '[Profile] Reset Auth Fail';
export const DROP_ERROR = '[Profile] Drop Error';

export type ProfileActions =
  | ResetAuthStart
  | ResetAuthSuccess
  | ResetAuthFail
  | DropError;
