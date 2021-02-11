import { createAction, props } from '@ngrx/store';

// export class AppSpinner implements Action {
//   readonly type = APP_SPINNER;
//   constructor(public payload: boolean) {}
// }

export const AppSpinner = createAction(
  '[App] App Spinner',
  props<{ on: boolean }>()
);

// export class AppStyle implements Action {
//   readonly type = APP_STYLE;
//   constructor(public payload: { appDarkMode: boolean }) {}
// }

export const AppStyle = createAction(
  '[App] App Style',
  props<{ appDarkMode: boolean }>()
);