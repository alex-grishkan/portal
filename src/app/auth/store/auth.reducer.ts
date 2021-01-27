import * as AuthActions from '../store/auth.actions';
import { User } from '../user.model';

export interface State {
  user: User;
  authError: string;
  authSpinner: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  authSpinner: false,
};

export function AuthReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN_START:
      return {
        ...state,
        user: null,
        authError: null,
        authSpinner: true,
      };
    case AuthActions.LOGIN_SUCCESS:
    case AuthActions.UPDATE_USER:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: user,
        authError: null,
        authSpinner: false,
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        authSpinner: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        authError: null,
        authSpinner: false,
      };
    case AuthActions.RESET_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
}
