import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.css'],
})
export class ResultViewComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { accession: string,  }) {}

  ngOnInit(): void {}
}
