import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import * as AuthActions from '../../auth/store/auth.actions';
import * as ProfileActions from './profile.actions';
import { User } from '../../auth/user.model';

export interface ProfileResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleResetAuthSuccess = (email: string, localId: string, idToken: string, refreshToken: string, expiresIn: string) => {
  const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000));
  const user = new User(email, localId, idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  
  return new ProfileActions.ResetAuthSuccess({
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
    return of(new ProfileActions.ResetAuthFail(errorMessage));
  } 
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
    default:
      errorMessage = errorRes.error.error.message;
  }
  return of(new ProfileActions.ResetAuthFail(errorMessage));
};

@Injectable()
export class ProfileEffects {

  @Effect()
  resetAuthStart = this.actions$.pipe(
    ofType(ProfileActions.RESETAUTH_START),
    switchMap((action: ProfileActions.ResetAuthStart) => {
      let p = null;
      if (action.payload.email) {
        p = {
          idToken: action.payload.idToken,
          email: action.payload.email,
          returnSecureToken: true,
        }
      } else {
        p = {
          idToken: action.payload.idToken,
          password: action.payload.password,
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
  );

  @Effect()
  updateUser = this.actions$.pipe(
    ofType(ProfileActions.RESETAUTH_SUCCESS),
    map((action: ProfileActions.ResetAuthSuccess) => {
      const user = new AuthActions.UpdateUser({
        email: action.payload.email,
        userId: action.payload.localId,
        token: action.payload.idToken,
        expirationDate: new Date(new Date().getTime() + (+action.payload.expiresIn * 1000))
      });
      return user; 
    })
  )

  @Effect({ dispatch: false })
  redirect = this.actions$.pipe(
    ofType(ProfileActions.RESETAUTH_SUCCESS),
    tap(() => {
      this.router.navigate(['/results']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
  ) {}
}
