import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AppActions from '../store/app.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(private store: Store<{appStore: fromApp.AppState}>) { }

  ngOnInit(): void {
    this.store.select('appStore').subscribe((appStore) => {
      this.isAuthenticated = !!appStore.user;
      console.log(appStore);
    })
  }

  onLogout() {
    this.store.dispatch(new AppActions.Logout());
  }
}
