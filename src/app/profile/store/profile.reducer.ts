import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from '../store/profile.actions';

export interface State {
  profileError: string;
  profileSpinner: boolean;
}

const initialState: State = {
  profileError: null,
  profileSpinner: false,
};

export const ProfileReducer = createReducer(
  initialState,
  on(
    ProfileActions.ResetAuthStart,
    (state) => ({
      ...state,
      profileError: null,
      profileSpinner: true
    })
  ),

  on(
    ProfileActions.ResetAuthSuccess,
    (state) => ({
      ...state,
      profileError: null,
      profileSpinner: false
    })
  ),
  
  on(
    ProfileActions.ResetAuthFail,
    (state, action) => ({
      ...state,
      profileError: action.errorMessage,
      profileSpinner: false
    })
  ),

  on(
    ProfileActions.DropError,
    (state, action) => ({
      ...state,
      profileError: null
    })
  )
)
