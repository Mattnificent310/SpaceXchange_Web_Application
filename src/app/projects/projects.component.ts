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
    this.projectForm = this.fb.group({
      names: ['', [Validators.required, Validators.minLength(3)]],      
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      emailAddress: ['', [Validators.required, Validators.minLength(10)]],
      description: ['Add Description Here...', [Validators.required, Validators.maxLength(140)]],
      verificationDate: [new Date(), Validators.required],
      contactType: ['B'],
      selectedContacts: [[]],
      rating: [3]
    })

  }
  val1: number;

  val2: number = 5;

  val3: number;

  val4: number = 5;

  val5: number;

  msg: string;

  handleRate(event) {
      this.msg = "You have rated " + event.value;
  }

  handleCancel(event) {
      this.msg = "Rating Cancelled";
  }
  hasFormErrors() {
    return !this.projectForm.valid;
  }

  onSubmit() {
    alert(JSON.stringify(this.projectForm.value));
  }








}
