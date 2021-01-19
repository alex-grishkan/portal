import { Action } from '@ngrx/store';

export class AppSpinner implements Action {
  readonly type = APP_SPINNER;
  constructor(public payload: boolean) {}
}

export class AppStyle implements Action {
  readonly type = APP_STYLE;
  constructor(public payload: { appDarkMode: boolean }) {}
}

export const APP_SPINNER = '[App] App Spinner';
export const APP_STYLE = '[App] App Style';

export type AppActions = AppSpinner | AppStyle;
