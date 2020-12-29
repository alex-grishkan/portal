import { ActionReducerMap } from '@ngrx/store';

import * as AppActions from './app.actions'; 
import { User } from '../store/user.model';
import { Result } from './result.model';

export interface AppState {
	user: User;
	results: Result[];
}

const initialState: AppState = {
	user: null,
	results: [
		{ id: '1', patientName: 'John Doe', patientDOB: new Date(), accession: 'M1234567', dateOfService: new Date(), reportDate: new Date() },
		{ id: '2', patientName: 'Jane Doe', patientDOB: new Date(), accession: 'M7654321', dateOfService: new Date(), reportDate: new Date() }
	]
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
				user: null,
				results: []
			}
		default:
			return state
	}
}