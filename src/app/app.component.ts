import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../app/store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  appProgress: boolean = false;
  darkMode: boolean = false;

  @HostBinding('class') activeThemeCssClass: string

  constructor(private store: Store<fromApp.AppState>,
              private overlayContainer: OverlayContainer) {
  }

  ngOnInit() {
    this.store.select('app').subscribe((progress) => {
      this.appProgress = progress.appProgress;
    });
    this.store.select('app').subscribe((style) => {
      this.setActiveTheme(style.appDarkMode);
    })
  }

  setActiveTheme(darkMode: boolean) {
    if (this.darkMode === darkMode) return;
    this.darkMode = darkMode;
    
    const cssClass = (darkMode ? 'darkMode' : null);

    if (this.activeThemeCssClass !== cssClass) {
      const classList = this.overlayContainer.getContainerElement().classList;
      if (classList.contains(this.activeThemeCssClass)) {
        classList.replace(this.activeThemeCssClass, cssClass)
      } else {
        classList.add(cssClass)
      };
      this.activeThemeCssClass = cssClass;
    }
  }
  
  toggleDark() {
    this.setActiveTheme(!this.darkMode);
  }
}
