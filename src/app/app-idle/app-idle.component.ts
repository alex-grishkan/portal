import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-app-idle',
  templateUrl: './app-idle.component.html',
  styleUrls: ['./app-idle.component.css']
})
export class AppIdleComponent implements OnInit {
  countdown = null;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('app').subscribe((state) => {
      this.countdown = state.appIdleCountdown;
    })
  }
}
