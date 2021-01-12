import { Action } from '@ngrx/store';

export class AppProgress implements Action {
	readonly type = APP_PROGRESS;
	constructor(public payload: boolean) {}
}

export class AppStyle implements Action {
	readonly type = APP_STYLE;
	constructor(public payload: {appDarkMode:boolean}) {}
}

export const APP_PROGRESS = '[App] AppProgress';
export const APP_STYLE = '[App] AppStyle';

export type AppActions =
	| AppProgress
	| AppStyle

