import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'at-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', '../../../node_modules/material-icons/iconfont/material-icons.css']
})
export class ProjectsComponent implements OnInit {

  projectForm: FormGroup;

  minProjectDate = new Date();

  val1: number;

  val2: number;

  val3: number;

  val4: number;

  val5: number;

  accIndex: number;

  blockSpecial: RegExp = /^[a-z\d\-_\s]+$/i;

  msg: string;

  name: String;

  phone: String;

  email: String;

  allDevs = [

    { label: 'Jill', value: 'Jill Cool' },
    { label: 'Joe', value: 'Joe Cool' },
    { label: 'Mary', value: 'Mary Cool' },
    { label: 'Susan', value: 'Susan Jones' },
    { label: 'Phil', value: 'Phil Stephens' },
    { label: 'Karen', value: 'Karen Phillips' },
    { label: 'Chris', value: 'Chris Hampton' },
    { label: 'Si', value: 'Si Chew' },
    { label: 'Terri', value: 'Terri Smith' }

  ]


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.name = '';
    this.phone = '';
    this.email = '';
    if (sessionStorage.getItem('email') || sessionStorage.getItem('phone')) {
      this.name = sessionStorage.getItem('name');
      this.phone = sessionStorage.getItem('phone');
      this.email = sessionStorage.getItem('email');
    }
    this.projectForm = this.fb.group({
      names: [this.name, [Validators.required, Validators.minLength(3)]],
      phoneNumber: [this.phone, [Validators.required, Validators.minLength(10)]],
      emailAddress: [this.email, [Validators.required, Validators.minLength(10)]],
      description: ['Add Description Here...', [Validators.required, Validators.maxLength(140)]],
      verificationDate: [new Date(), Validators.required],
      contactType: ['B'],
      selectedContacts: [[]],
      rating: [3]
    })

this.val2 =  5;
this.accIndex = 0;
  }
  handleRate(event) {
      this.msg = 'You have rated ' + event.value;
  }

  handleCancel(event) {
      this.msg = 'Rating Cancelled';
  }
  hasFormErrors() {
    return !this.projectForm.valid;
  }

  onSubmit() {
    alert(JSON.stringify(this.projectForm.value));
  }

  openNext() {
    this.accIndex = (this.accIndex === 5) ? 0 : this.accIndex + 1;
  }

  openPrev() {
    this.accIndex = (this.accIndex <= 0) ? 5 : this.accIndex - 1;
  }
clickTab(event) {
  this.accIndex = event.index;
}

}
