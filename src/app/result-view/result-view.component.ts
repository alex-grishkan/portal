import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.css'],
})
export class ResultViewComponent implements OnInit {
  viewURL: SafeResourceUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { accession: string, viewURL: string },
              private sanitizer:DomSanitizer) {}

  ngOnInit(): void {
    this.viewURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.viewURL);
  }
}
