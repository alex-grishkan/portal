import { Action } from '@ngrx/store';

export class AppProgress implements Action {
	readonly type = APP_PROGRESS;
	constructor(public payload: boolean) {}
}

export const APP_PROGRESS = '[App] AppProgress';

export type AppActions =
	| AppProgress

