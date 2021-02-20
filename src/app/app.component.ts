import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  private subscriptions = new Subscription();
  private idleDialogRef: MatDialogRef<AppIdleComponent>;

  @HostBinding('class') activeThemeCssClass: string;

  constructor(
    private store: Store<fromApp.AppState>,
    private overlayContainer: OverlayContainer,
    private router: Router,
    private idle: Idle,
    private modWindow: MatDialog
  ) { }

  ngOnInit() {
    this.idle.setIdle(300);
    this.idle.setTimeout(30);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.subscriptions.add(this.idle.onTimeout.subscribe(() => {
      this.idle.stop();
      this.modWindow.closeAll();
      this.store.dispatch(AuthActions.Logout());
      this.store.dispatch(new ResultActions.Reset());
      this.router.navigate(['']);
    }));

    this.subscriptions.add(this.idle.onTimeoutWarning.subscribe((countdown: number) => {
      if (!this.idleDialogRef) {
        this.idleDialogRef = this.modWindow.open(AppIdleComponent);
        this.idleDialogRef.disableClose = true;

        this.subscriptions.add(this.idleDialogRef.afterClosed().subscribe((idleDialog) => {
          this.idleDialogRef = null;
          if (!idleDialog) return;
          if (idleDialog.event == 'extendSession') {
            this.idle.watch();
          } else {
            this.modWindow.closeAll();
            this.store.dispatch(AuthActions.Logout());
            this.store.dispatch(new ResultActions.Reset());
            this.router.navigate(['']);
          }
        }));
      };
      this.store.dispatch(AppActions.AppIdleCountdown({ appIdleCountdown: countdown}));
    }));

    this.store.select('auth').subscribe((auth) => {
      if (auth.user) {
        this.idle.watch();
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
}
