import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

import * as AppActions from '../app/store/app.actions';
import * as AuthActions from '../app/auth/store/auth.actions';
import * as ResultActions from '../app/result-list/store/result-list.actions';
import * as fromApp from '../app/store/app.reducer';
import { AppIdleComponent } from './app-idle/app-idle.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit,OnDestroy {
  appSpinner: boolean = false;
  darkMode: boolean = false;
  idleState: string = 'Not started';
  timedOut: boolean = false;
  private subscriptions = new Subscription();
  idleDialog = null;

  @HostBinding('class') activeThemeCssClass: string;

  constructor(
    private store: Store<fromApp.AppState>,
    private overlayContainer: OverlayContainer,
    private router: Router,
    private idle: Idle,
    private modWindow: MatDialog
  ) { }

  ngOnInit() {
    this.idle.setIdle(5);
    this.idle.setTimeout(10);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.subscriptions.add(this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle';
    }));
    this.subscriptions.add(this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out';
      this.timedOut = true;
      this.store.dispatch(AuthActions.Logout());
      this.store.dispatch(new ResultActions.Reset());
      this.router.navigate(['']);
    }));
    this.subscriptions.add(this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle';
    }));
    this.subscriptions.add(this.idle.onTimeoutWarning.subscribe((countdown: number) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds';
      this.openIdleDialog(countdown);
    }));

    this.store.select('auth').subscribe((auth) => {
      if (auth.user) {
        this.idle.watch();
        this.timedOut = false; 
      } else {
        this.idle.stop();
      }
    });

    this.store.select('app').subscribe((progress) => {
      this.appSpinner = progress.appSpinner;
    });

    this.store.select('app').subscribe((style) => {
      this.setActiveTheme(style.appDarkMode);
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  resetIdle() {
    this.idle.watch();
    this.idleState = 'Started';
    this.timedOut = false;
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

  openIdleDialog(countdown: number) {
    if (!this.idleDialog) {
      this.idleDialog = this.modWindow
        .open(AppIdleComponent)
        .updateSize('50vw', '40vh')
        //.disableClose = true
    } else {
      this.store.dispatch(AppActions.AppIdleCountdown({ appIdleCountdown: countdown}));
    }
  }
}
