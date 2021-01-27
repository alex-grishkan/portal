import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { environment } from 'src/environments/environment';

import * as fromApp from '../../store/app.reducer';
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

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new ProfileActions.ResetPasswordFail(errorMessage));
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
  return of(new ProfileActions.ResetPasswordFail(errorMessage));
};

@Injectable()
export class ProfileEffects {
  @Effect()
 resetPasswordStart = this.actions$.pipe(
    ofType(ProfileActions.RESETPASSWORD_START),
    switchMap((action: ProfileActions.ResetPasswordStart) => {
      return this.http
        .post<ProfileResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + environment.firebaseAPIKey,
          {
            idToken: action.payload.idToken,
            password: action.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((resData:ProfileResponseData) => {
            console.log(resData);
            
            const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
            // update user in the local storage
            // const user = new User(email, userId, token, expirationDate);
            // localStorage.setItem('userData', JSON.stringify(user));
          
            return new ProfileActions.ResetPasswordSuccess({
              email : resData.email,
              idToken : resData.idToken,
              refreshToken : resData.refreshToken,
              expiresIn : resData.expiresIn
            })
          }),
          catchError((errorRes) => {
						console.log(errorRes);
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  resetPasswordSuccess = this.actions$.pipe(
    ofType(ProfileActions.RESETPASSWORD_SUCCESS),
    map((action: ProfileResponseData) => {
      console.log(action);
      return new AuthActions.UpdateUser({
        email: action.email,
        userId: action.localId,
        token: action.idToken,
        expirationDate: new Date(new Date().getTime() + (+action.expiresIn * 1000))
      });
    })
  )

  @Effect({ dispatch: false })
  redirect = this.actions$.pipe(
    ofType(ProfileActions.RESETPASSWORD_SUCCESS),
    tap(() => {
      this.router.navigate(['/results']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}
