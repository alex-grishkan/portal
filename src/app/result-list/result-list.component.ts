import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { Result } from '../store/result.model';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Result>();
  displayColumns = ['dateOfService', 'patientName', 'patientDOB', 'accession', 'reportDate', 'testList', 'details'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort.initialized.subscribe(() => {
      this.dataSource.sort = this.sort;
    });
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.dataSource.sort = this.sort;
    });
  }
  
  constructor(private store: Store<{appStore: fromApp.AppState}>) {}

  ngOnInit(): void {
    this.store.select('appStore').subscribe((appStore) => {
      this.dataSource = new MatTableDataSource(appStore.results);
    });
  }

  onViewReport(resultId: string) {
    alert('View report of ' + resultId + ' result');
  }
}
