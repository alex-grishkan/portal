import * as AppActions from './app-actions'; 

export interface State {
	appProgress: boolean
}

const initialState: State = {
	appProgress: null
}

export function App_Reducer(state: State = initialState, action: AppActions.AppActions) {
	switch (action.type) {
		case AppActions.APP_PROGRESS:
			return {
				...state,
				appProgress: action.payload
			};
		default:
			return state
	}
}