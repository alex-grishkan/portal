import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AppActions from '../store/app.actions';
import * as AuthActions from '../auth/store/auth.actions';
import * as ProfileActions from '../profile/store/profile.actions';
import * as ResultActions from '../result-list/store/result-list.actions';

const ValidatorForm: ValidatorFn = (control: FormGroup): {[key: string]: boolean} | null => {
  const newPassword = control.get('newPassword').value;
  const newPasswordConfirm = control.get('newPasswordConfirm').value;
  if (newPassword === newPasswordConfirm) return null;
  return { 'match': true };
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  darkMode: boolean = false;
  newEmail: boolean = false;
  newPassword: boolean = false;
  profileSpinner: boolean = false;
  profileError: string = null;
  token: string = null;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  profileForm = new FormGroup({
    appDarkMode: new FormControl(false),
    newEmail: new FormControl(null, Validators.email),
    newPassword: new FormControl(null),
    newPasswordConfirm: new FormControl(null)
  }, { validators: ValidatorForm });

  ngOnInit(): void {
    this.store.select('app').subscribe((appState) => {
      this.profileForm.patchValue({ appDarkMode: appState.appDarkMode });
      this.darkMode = appState.appDarkMode;
    });
    this.store.select('profile').subscribe((profileState) => {
      this.profileSpinner = profileState.profileSpinner;
      this.profileError = profileState.profileError;
    });
    this.store.select('auth').subscribe((authState) => {
      if (authState.user) this.token = authState.user.token;
    });
  }

  onInputEmail() {
    this.newEmail = !!this.profileForm.get('newEmail').value;
  }

  onInputPassword() {
    this.newPassword = (!!this.profileForm.get('newPassword').value || !!this.profileForm.get('newPasswordConfirm').value);
    if (!!this.profileForm.get('newPasswordConfirm').value && (this.profileForm.get('newPassword').value !== this.profileForm.get('newPasswordConfirm').value)) {
      this.profileForm.get('newPasswordConfirm').setErrors({'match': true});
    }
  }

  onSave() {
    this.store.dispatch(AppActions.AppStyle({ appDarkMode: this.profileForm.get('appDarkMode').value }));

    const newEmail = this.profileForm.get('newEmail').value;
    if (newEmail) {
      this.store.dispatch(ProfileActions.ResetAuthStart({ idToken: this.token, email: newEmail, password: null }));
      return;
    }
    const newPassword = this.profileForm.get('newPassword').value;
    if (newPassword) {
      this.store.dispatch(ProfileActions.ResetAuthStart({ idToken: this.token, email: null, password: newPassword }));
      return;
    }

    this.router.navigate(['results']);
  }

  onResetError() {
    this.store.dispatch(AuthActions.Logout());
    this.store.dispatch(new ResultActions.Reset());
    this.router.navigate(['']);
  }
}
