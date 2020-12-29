import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private store: Store<{appStore: fromApp.AppState}>,
    private router: Router) { }

  ngOnInit(): void {
    this.store.select('appStore').subscribe((appStore) => {
      this.isAuthenticated = !!appStore.user;
    })
  }

  onLogout() {
    this.store.dispatch(new AppActions.Logout());
    this.router.navigate(['']);
  }
}
