import { SamplePeopleData } from './../../../../SpaceXchange_Web_Application-host/src/app/timesheet/sample.people.data';
import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-listings",
  templateUrl: "./listings.component.html",
  styleUrls: ["./listings.component.css"]
})

export class ListingsComponent implements OnInit {
  people = SamplePeopleData.people;

  constructor(private router: Router) {

  }

  ngOnInit() {

  }
  addNew() {
    this.router.navigate(['/construction']);
  }
}
