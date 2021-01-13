import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'; 
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { Result } from './result.model';
import { ResultViewComponent } from '../result-view/result-view.component';

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

  constructor(
    private store: Store<fromApp.AppState>,
    private modWindow: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
    this.store.select('result').subscribe((result) => {
      if (result.results) {
        this.dataSource = new MatTableDataSource(result.results);
      }
    });
  }

  onViewReport(resultId: string) {
    this.modWindow.open(ResultViewComponent, { data: {resultId: resultId} }).updateSize('60vw', '65vh');
  }
}
