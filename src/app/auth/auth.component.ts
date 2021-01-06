import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import * as AppActions from '../store/app-actions';
import * as AuthActions from './store/auth.actions';
import * as ResultActions from '../result-list/store/result-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  hidePassword = true;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  onLogin() {
    const user = new User(
      '1', 
      this.loginForm.get('email').value,
      'token',
      new Date());

    this.store.dispatch(new AuthActions.Login(user));

    this.store.dispatch(new AppActions.AppProgress(true));
    setTimeout(() => {
      const results = [
        { id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
        { id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
        { id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
      ];
      this.store.dispatch(new ResultActions.Load(results));
      this.store.dispatch(new AppActions.AppProgress(false));
    }, 2000);

    this.router.navigate(['results']);
  }

}
