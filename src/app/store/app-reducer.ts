import * as AppActions from './app-actions'; 

export interface State {
	appProgress: boolean,
	appTheme: string,
	appDarkMode: boolean
}

const initialState: State = {
	appProgress: null,
	appTheme: 'deeppurple-amber',
	appDarkMode: false
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
				appTheme: action.payload.appTheme,
				appDarkMode: action.payload.appDarkMode
			};
		default:
			return state
	}
}