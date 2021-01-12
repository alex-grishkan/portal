import * as AppActions from './app-actions'; 

export interface State {
	appProgress: boolean,
	appDarkMode: boolean
}

const initialState: State = {
	appProgress: null,
	appDarkMode: (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
}

export function App_Reducer(state: State = initialState, action: AppActions.AppActions) {
	switch (action.type) {
		case AppActions.APP_PROGRESS:
			return {
				...state,
				appProgress: action.payload
			};
		case AppActions.APP_STYLE:
			return {
				...state,
				appDarkMode: action.payload.appDarkMode
			};
		default:
			return state
	}
}