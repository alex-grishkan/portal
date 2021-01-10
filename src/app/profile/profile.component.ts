import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AppActions from '../store/app-actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) { }

  profileForm = new FormGroup({
    appTheme: new FormControl(null),
    appDarkMode: new FormControl(false)
  });

  ngOnInit(): void {
    this.store.select('app').subscribe((style) => {
      const x = {appTheme: style.appTheme, appDarkMode: style.appDarkMode};
      this.profileForm.patchValue(x);
    })
  }

  onSave() {
    const x = {appTheme: this.profileForm.get('appTheme').value, appDarkMode: this.profileForm.get('appDarkMode').value};
    this.store.dispatch(new AppActions.AppStyle(x));

    this.router.navigate(['results']);
  }

}
