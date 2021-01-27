import * as ProfileActions from '../store/profile.actions';

export interface State {
  profileError: string;
  profileSpinner: boolean;
}

const initialState: State = {
  profileError: null,
  profileSpinner: false,
};

export function ProfileReducer(state: State = initialState, action: ProfileActions.ProfileActions) {
  switch (action.type) {
    case ProfileActions.RESETAUTH_START:
      return {
        ...state,
        profileError: null,
        profileSpinner: true,
      };
    case ProfileActions.RESETAUTH_SUCCESS:
      return {
        ...state,
        profileError: null,
        profileSpinner: false,
      };
    case ProfileActions.RESETAUTH_FAIL:
      return {
        ...state,
        profileError: action.payload,
        profileSpinner: false,
      };
    case ProfileActions.DROP_ERROR:
      return {
        ...state,
        profileError: null,
      };
    default:
      return state;
  }
}
