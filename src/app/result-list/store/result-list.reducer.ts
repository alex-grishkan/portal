import * as ResultActions from './result-list.actions'; 
import { Result } from '../result.model';

export interface State {
	results: Result[];
}

const initialState: State = {
	results: null
}

export function ResultReducer(state: State = initialState, action: ResultActions.ResultActions) {
	switch (action.type) {
		case ResultActions.LOAD:
			return {
				...state,
				results: action.payload
			};
			case ResultActions.RESET:
				return {
					...state,
					results: null
				};			
		default:
			return state
	}
}