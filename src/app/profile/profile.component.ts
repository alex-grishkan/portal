import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AppActions from '../store/app.actions';
import * as ProfileActions from '../profile/store/profile.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  darkMode: boolean = false;
  newEmail: boolean = false;
  newPassword: boolean = false;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  profileForm = new FormGroup({
    appDarkMode: new FormControl(false),
    newEmail: new FormControl(null),
    newPassword: new FormControl(null),
    newPasswordConfirm: new FormControl(null),
  });

  ngOnInit(): void {
    this.store.select('app').subscribe((appState) => {
      this.profileForm.patchValue({ appDarkMode: appState.appDarkMode });
      this.darkMode = appState.appDarkMode;
    });
  }

  onInputEmail() {
    this.newEmail = !!this.profileForm.get('newEmail').value;
  }

  onInputPassword() {
    this.newPassword = (this.profileForm.get('newPassword').value || this.profileForm.get('newPasswordConfirm').value);
  }

  onSave() {
    this.store.dispatch(new AppActions.AppStyle({ appDarkMode: this.profileForm.get('appDarkMode').value }));

    this.router.navigate(['results']);
  }


  UpdatePassword() {
    console.log('Update Password');
    this.store.select('auth').subscribe((authState) => {
      const idToken = authState.user.token;
      this.store.dispatch(new ProfileActions.ResetPasswordStart({ idToken: idToken, password: 'Welcome1' }));
    });
  }
}
