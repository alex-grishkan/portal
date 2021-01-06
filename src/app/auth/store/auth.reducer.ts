import * as AuthActions from '../store/auth.actions'; 
import { User } from '../user.model';

export interface State {
	user: User;
}

const initialState: State = {
	user: null,
}

export function AuthReducer(state: State = initialState, action: AuthActions.AuthActions) {
	switch (action.type) {
		case AuthActions.LOGIN:
			return {
				...state,
				user: action.payload
			};
		case AuthActions.LOGOUT:
			return {
				...state,
				user: null,
			};
		default:
			return state
	}
}