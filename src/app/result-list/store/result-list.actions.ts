import { Action } from '@ngrx/store';

import { Result } from '../result.model';

export class Load implements Action {
	readonly type = LOAD;
	constructor(public payload: Result[]) {}
}

export class Reset implements Action {
	readonly type = RESET;
}

export const LOAD = '[Result] Load';
export const RESET = '[Result] Rest';

export type ResultActions =
	| Load
	| Reset
