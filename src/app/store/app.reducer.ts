import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromResult from '../result-list/store/result-list.reducer';
import * as fromApp from '../store/app-reducer';

export interface AppState {
	auth: fromAuth.State,
	result: fromResult.State,
	progress: fromApp.State
}

export const appReducer: ActionReducerMap<AppState> = {
	auth: fromAuth.AuthReducer,
	result: fromResult.ResultReducer,
	progress: fromApp.App_Reducer
}
