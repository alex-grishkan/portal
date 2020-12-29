import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { Result } from '../store/result.model';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {
  results: Result[];
  
  constructor(private store: Store<{appStore: fromApp.AppState}>) {}

  ngOnInit(): void {

    this.store.select('appStore').subscribe((appStore) => {
      this.results = appStore.results;
    })
  }

}
