import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AppActions from '../store/app.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  darkMode: boolean = false;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  profileForm = new FormGroup({
    appDarkMode: new FormControl(false),
  });

  ngOnInit(): void {
    this.store.select('app').subscribe((appState) => {
      const x = { appDarkMode: appState.appDarkMode };
      this.profileForm.patchValue(x);
      this.darkMode = appState.appDarkMode;
    });
  }

  onSave() {
    const x = { appDarkMode: this.profileForm.get('appDarkMode').value };
    this.store.dispatch(new AppActions.AppStyle(x));

    this.router.navigate(['results']);
  }
}
