import { SamplePeopleData } from './sample.people.data';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})

export class ListingsComponent implements OnInit {
  people = SamplePeopleData.people;
  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.sortOptions = [
      { label: 'Newest First', value: '!id' },
      { label: 'Oldest First', value: 'id' },
      { label: 'Type', value: 'firstName' }
    ];
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  addNew() {
    this.router.navigate(['/construction']);
  }
  scrollTop(event) {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 50); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
