import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import * as AuthActions from '../../auth/store/auth.actions';
import * as ProfileActions from './profile.actions';

export interface ProfileResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleResetAuthSuccess = (email: string, localId: string, idToken: string, refreshToken: string, expiresIn: string) => {
  return ProfileActions.ResetAuthSuccess({
    email : email,
    localId: localId,
    idToken : idToken,
    refreshToken : refreshToken,
    expiresIn : expiresIn
  })
}

const handleResetAuthError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(ProfileActions.ResetAuthFail({ errorMessage: errorMessage }));
  } 
  switch (errorRes.error.error.message) {
    case 'INVALID_ID_TOKEN':
      errorMessage = "The user's credential is no longer valid";
      break;
    default:
      errorMessage = errorRes.error.error.message;
  }
  return of(ProfileActions.ResetAuthFail({ errorMessage: errorMessage }));
};

@Injectable()
export class ProfileEffects {

  resetAuthStart = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.ResetAuthStart),
      switchMap((action) => {
        let p = null;
        if (action.email) {
          p = {
            idToken: action.idToken,
            email: action.email,
            returnSecureToken: true,
          }
        } else {
          p = {
            idToken: action.idToken,
            password: action.password,
            returnSecureToken: true,
          }
        }

        return this.http
          .post<ProfileResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + environment.firebaseAPIKey, p
          )
          .pipe(
            map((resData:ProfileResponseData) => {
              return handleResetAuthSuccess(
                resData.email,
                resData.localId,
                resData.idToken,
                resData.refreshToken,
                resData.expiresIn
              );
            }),
            catchError((errorRes) => {
              return handleResetAuthError(errorRes);
            })
          );
      })
    )
  );

  updateUser = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.ResetAuthSuccess),
      map((action) => {
        const user = AuthActions.UpdateUser({
          email: action.email,
          userId: action.localId,
          token: action.idToken,
          expirationDate: new Date(new Date().getTime() + (+action.expiresIn * 1000))
        });
        return user; 
      })
    )
  );

  redirect = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.ResetAuthSuccess),
      tap(() => {
        this.router.navigate(['/results']);
      })
    ), { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
  ) {}
}
