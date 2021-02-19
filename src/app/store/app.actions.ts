import { createAction, props } from '@ngrx/store';

export const AppSpinner = createAction(
  '[App] App Spinner',
  props<{ on: boolean }>()
);

export const AppStyle = createAction(
  '[App] App Style',
  props<{ appDarkMode: boolean }>()
);

export const AppIdleCountdown = createAction(
  '{App] Idle Countdown',
  props<{ appIdleCountdown: number }>()
)