import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import * as AuthActions from './auth.actions';
import * as ResultActions from '../../result-list/store/result-list.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleSuccess = (email: string, userId: string, token: string, expiresIn: number) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  return AuthActions.LoginSuccess({ email: email, userId: userId, token: token, expirationDate: expirationDate });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(AuthActions.LoginFail({ errorMessage: errorMessage }));
  }
  switch (errorRes.error.error.message) {
    case 'USER_DISABLED':
      errorMessage = 'The user account has been disabled by an administrator';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email could not be found';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is invalid';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is invalid';
      break;
  }
  return of(AuthActions.LoginFail({ errorMessage: errorMessage }));
};

@Injectable()
export class AuthEffects {

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginStart),
      switchMap(action => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              return handleSuccess(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  )

  loginSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginSuccess),
      map(() => {
        return new ResultActions.LoadStart();
      })
    )
  )

  authRedirect = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginSuccess),
      tap(() => {
        this.router.navigate(['/results']);
      })
    ), { dispatch: false }
  )

  forgotPassword = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.ForgotPasswordStart),
      switchMap(action => {
        console.log(action.email);
        return this.http
          .post(
            'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + environment.firebaseAPIKey,
            {
              email: action.email,
              requestType: 'PASSWORD_RESET'
            }
          )
          .pipe(
            map((resData) => {
              return AuthActions.ForgotPasswordSuccess();
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
