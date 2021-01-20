import { Action } from '@ngrx/store';

import { Result } from '../result.model';

export class LoadStart implements Action {
  readonly type = LOAD_START;
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: Result[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;
  constructor(public payload: string) {}
}

export class Reset implements Action {
  readonly type = RESET;
}

export const LOAD_START = '[Result] Load Start';
export const LOAD_SUCCESS = '[Result] Load Success';
export const LOAD_FAIL = '[Result] Load Fail'
export const RESET = '[Result] Reset';

export type ResultActions = LoadStart | LoadSuccess | LoadFail | Reset;
