import { Action } from '@ngrx/store';

import { User } from '../store/user.model';

export class Login implements Action {
	readonly type = LOGIN;
	constructor(public payload: User) {}
}

export class Logout implements Action {
	readonly type = LOGOUT;
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export type AppActions =
	| Login
	| Logout

