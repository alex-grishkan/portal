import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

import * as AuthActions from '../app/auth/store/auth.actions';
import * as ResultActions from '../app/result-list/store/result-list.actions';
import * as fromApp from '../app/store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  appSpinner: boolean = false;
  darkMode: boolean = false;
  idleState: string = 'Not started.';
  timedOut: boolean = false;

  @HostBinding('class') activeThemeCssClass: string;

  constructor(
    private store: Store<fromApp.AppState>,
    private overlayContainer: OverlayContainer,
    private router: Router,
    private idle: Idle
  ) {
    idle.setIdle(5);
    idle.setTimeout(5);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
    });
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.store.dispatch(AuthActions.Logout());
      this.store.dispatch(new ResultActions.Reset());
      this.router.navigate(['']);
    });
    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
    });
    idle.onTimeoutWarning.subscribe((countdown: number) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
    });

    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
   }

  ngOnInit() {
    this.store.select('app').subscribe((progress) => {
      this.appSpinner = progress.appSpinner;
    });
    this.store.select('app').subscribe((style) => {
      this.setActiveTheme(style.appDarkMode);
    });
  }

  setActiveTheme(darkMode: boolean) {
    if (this.darkMode === darkMode) return;
    this.darkMode = darkMode;

    const cssClass = darkMode ? 'darkMode' : null;

    if (this.activeThemeCssClass !== cssClass) {
      const classList = this.overlayContainer.getContainerElement().classList;
      if (classList.contains(this.activeThemeCssClass)) {
        classList.replace(this.activeThemeCssClass, cssClass);
      } else {
        classList.add(cssClass);
      }
      this.activeThemeCssClass = cssClass;
    }
  }

  toggleDark() {
    this.setActiveTheme(!this.darkMode);
  }
}
