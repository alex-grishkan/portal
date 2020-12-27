import { ActionReducerMap } from '@ngrx/store';

import { User } from '../store/user.model';
import * as AppActions from './app.actions'; 

export interface AppState {
	user: User;
}

const initialState: AppState = {
	user: null,
}

export function AppReducer(state: AppState = initialState, action: AppActions.AppActions) {
	switch (action.type) {
		case AppActions.LOGIN:
			return {
				...state,
				user: action.payload
			};
		case AppActions.LOGOUT:
			return {
				...state,
				user: null
			}
		default:
			return state
	}
}