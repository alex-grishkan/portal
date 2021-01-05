import { Action } from '@ngrx/store';

import { User } from '../store/user.model';

export class Login implements Action {
	readonly type = LOGIN;
	constructor(public payload: User) {}
}

export class Logout implements Action {
	readonly type = LOGOUT;
}

export class AppProgress implements Action {
	readonly type = APP_PROGRESS;
	constructor(public payload: boolean) {}
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const APP_PROGRESS = 'APP_PROGRESS';

export type AppActions =
	| Login
	| Logout
	| AppProgress

