import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { User } from '../store/user.model';
import * as AppActions from '../store/app.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  hidePassword = true;

  constructor(
    private store: Store<{appStore: fromApp.AppState}>,
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
    this.store.dispatch(new AppActions.Login(user));
    this.router.navigate(['results']);
  }
}
