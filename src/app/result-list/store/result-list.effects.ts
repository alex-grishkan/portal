import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { environment } from 'src/environments/environment';

import * as fromApp from '../../store/app.reducer';
import * as ResultListActions from './result-list.actions';
import { Result } from '../result.model';

export interface ResultResponseData {
  results: Result[];
}

const handleSuccess = (results: Result[]) => {
  return new ResultListActions.LoadSuccess(results);
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new ResultListActions.LoadFail(errorMessage));
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
  }
  return of(new ResultListActions.LoadFail(errorMessage));
};

@Injectable()
export class ResultEffects {
  @Effect()
  loadStart = this.actions$.pipe(
    ofType(ResultListActions.LOAD_START),
    switchMap((resultData: ResultListActions.LoadStart) => {
      return this.http
        .get<ResultResponseData>(
          'https://patientportal-ec4d6-default-rtdb.firebaseio.com/results'
          // {
          //   userId: resultData.payload,
          // }
        )
        .pipe(
          map((resData) => {
            return handleSuccess(
              resData.results
            );
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}
