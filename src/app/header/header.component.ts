import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AuthActions from '../auth/store/auth.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe((auth) => {
      this.isAuthenticated = !!auth.user;
    })
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['']);
  }
}
