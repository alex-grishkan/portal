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
    case ProfileActions.RESETPASSWORD_START:
      return {
        ...state,
        profileError: null,
        profileSpinner: true,
      };
    case ProfileActions.RESETPASSWORD_SUCCESS:
      return {
        ...state,
        profileError: null,
        profileSpinner: false,
      };
    case ProfileActions.RESETPASSWORD_FAIL:
      return {
        ...state,
        profileError: action.payload,
        profileSpinner: false,
      };
    case ProfileActions.RESET_ERROR:
      return {
        ...state,
        profileError: null,
      };
    default:
      return state;
  }
}
