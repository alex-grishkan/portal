import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AppActions from '../app/store/app.actions';
import * as fromApp from '../app/store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appProgress: boolean = false;

  constructor(private store: Store<{appStore: fromApp.AppState}>) {}

  ngOnInit() {
    this.store.select('appStore').subscribe((appStore) => {
      this.appProgress = appStore.appProgress;
    })
  }
}
