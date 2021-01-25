import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromResult from '../result-list/store/result-list.reducer';
import * as fromProfile from '../profile/store/profile.reducer';
import * as AppActions from './app.actions';

export interface State {
  appSpinner: boolean;
  appDarkMode: boolean;
}

const initialState: State = {
  appSpinner: false,
  appDarkMode:
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches,
};

export function App_Reducer(
  state: State = initialState,
  action: AppActions.AppActions
) {
  switch (action.type) {
    case AppActions.APP_SPINNER:
      return {
        ...state,
        appSpinner: action.payload,
      };
    case AppActions.APP_STYLE:
      return {
        ...state,
        appDarkMode: action.payload.appDarkMode,
      };
    default:
      return state;
  }
}

export interface AppState {
  auth: fromAuth.State;
  result: fromResult.State;
  profile: fromProfile.State;
  app: State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.AuthReducer,
  result: fromResult.ResultReducer,
  profile: fromProfile.ProfileReducer,
  app: App_Reducer,
};
