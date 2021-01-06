import { Action } from '@ngrx/store';

import { Result } from '../result.model';

export class Load implements Action {
	readonly type = LOAD;
	constructor(public payload: Result[]) {}
}

export const LOAD = '[Result] Load';

export type ResultActions =
	| Load
