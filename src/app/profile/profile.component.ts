import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router) { }

  profileForm = new FormGroup({
    theme: new FormControl(false),
  });

  ngOnInit(): void {

  }

  onSave() {
    //...

    this.router.navigate(['results']);
  }

}
