import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as AppActions from '../store/app.actions';
import * as AuthActions from './store/auth.actions';
import * as ResultActions from '../result-list/store/result-list.actions';
import * as fromApp from '../store/app.reducer';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  hidePassword = true;
  authSpinner = false;
  authError = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private http: HttpClient
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      this.authSpinner = authState.authSpinner;
      this.authError = authState.authError;
    });
  }

  onLogin() {
    this.store.dispatch(
      new AuthActions.LoginStart({
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      })
    );

    // // this.store.dispatch(new ResultActions.LoadStart());
    // setTimeout(() => {
    //   const results = [
    //     {
    //       patientName: 'Jane Doe',
    //       patientDOB: new Date('1987-05-21'),
    //       accession: 'U3232888',
    //       dateOfService: new Date('2020-12-05 18:15'),
    //       reportDate: new Date('2020-12-08'),
    //       testList: 'CBC',
    //       viewURL: ''
    //     },
    //     {
    //       patientName: 'John Doe',
    //       patientDOB: new Date('1961-03-21'),
    //       accession: 'U3232903',
    //       dateOfService: new Date('2020-11-01 10:00'),
    //       reportDate: new Date('2020-11-03'),
    //       testList: 'URINALYSIS',
    //       viewURL: ''
    //     },
    //     {
    //       patientName: 'Perry W. Mason',
    //       patientDOB: new Date('1942-03-11'),
    //       accession: 'U4286641',
    //       dateOfService: new Date('2020-09-12 09:10'),
    //       reportDate: new Date('2020-09-13'),
    //       testList: 'CMP',
    //       viewURL: ''
    //     },
    //   ];

    //   //store test results in the DB
    //   this.http
    //     .put(
    //       'https://patientportal-ec4d6-default-rtdb.firebaseio.com//results.json',
    //       results
    //     )
    //     .subscribe((response) => {
    //       console.log(response);
    //     });

    // //   this.store.dispatch(new ResultActions.LoadSuccess(results));
    //  }, 1000);

    this.router.navigate(['/results']);
  }

  onResetError() {
    this.store.dispatch(new AuthActions.ResetError());
  }
}
