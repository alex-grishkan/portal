import { createAction, props } from '@ngrx/store';

export const ResetAuthStart = createAction(
  '[Profile] Reset Auth Start',
  props<{ idToken: string, email: string, password: string }>()
);

export const ResetAuthSuccess = createAction(
  '[Profile] Reset Auth Success',
  props<{ email: string, localId: string, idToken: string, refreshToken:string, expiresIn:string }>()
);

export const ResetAuthFail = createAction(
  '[Profile] Reset Auth Fail',
  props<{ errorMessage: string }>()
);

export const DropError = createAction(
  '[Profile] Drop Error'
);

