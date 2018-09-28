import { Component, OnInit } from '@angular/core';
import { Galleria, Message } from "primeng/primeng";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'at-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../node_modules/material-icons/iconfont/material-icons.css']
})
export class ProfileComponent implements OnInit {

  profileImage: string;

  images = [
    { source: "http://i.pravatar.cc/300?u=Anne", title: "Anne" },
    { source: "http://i.pravatar.cc/300?u=Kerri", title: "Kerri" },
    { source: "http://i.pravatar.cc/300?u=Mary", title: "Mary" },
    { source: "http://i.pravatar.cc/300?u=Nancy", title: "Nancy" },
    { source: "http://i.pravatar.cc/300?u=Peta", title: "Peta" },
  ]

  selectedProfile: any;

  messages: Message[] = [];
registerForm: FormGroup;
date: Date;
editDate: boolean;
editEmail: boolean;
editPhone: boolean;
editName: boolean;
editSurname: boolean;
iconDate: String;
labelDate: String;
iconEmail: String;
labelEmail: String;
iconPhone: String;
labelEmail: String;
iconName: String;
labelName: String;
iconSurname: String;
labelSurname: String;
  constructor(private fb: FormBuilder) { }
  setDefault() {
    this.iconDate = 'fa fa-edit';
    this.labelDate = 'Edit';
    this.iconEmail = 'fa fa-edit';
    this.labelEmail = 'Edit';
    this.iconPhone = 'fa fa-edit';
    this.labelPhone = 'Edit';
    this.labelName = 'Edit';
    this.iconName = 'fa fa-edit';
    this.labelSurname = 'Edit';
    this.iconSurname = 'fa fa-edit';
  }
  switchOff() {
    this.editName = false;
    this.editSurname = false;
    this.editEmail = false;
    this.editPhone = false;
    this.editDate = false;
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      regName: ['', [Validators.required, Validators.minLength(3)]],      
      regSurname: ['', [Validators.required, Validators.minLength(3)]],      
      regPhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      regEmailAddress: ['', [Validators.required, Validators.minLength(10)]],
      regDOB: ['', [Validators.required, Validators.minLength(10)]],      
    })
    this.switchOff();
    this.setDefault();
  }

  onImageSelected(event) {
    console.log(JSON.stringify(event));
  }

  onDragStart(galleria) {
    this.selectedProfile = this.images[galleria.activeIndex];
    galleria.stopSlideshow();
  }
  editDates() {
    if (this.editDate) {
      this.switchOff();
      this.iconDate = 'fa fa-edit';
      this.labelDate = 'Edit';
    } else {
      this.switchOff();
      this.editDate = true;
      this.setDefault();
      this.iconDate = 'fa fa-check';
      this.labelDate = 'Done';
    }
  }
  editEmails() {
    if (this.editEmail) {
      this.switchOff();
      this.iconEmail = 'fa fa-edit';
      this.labelEmail = 'Edit';
    } else {
      this.switchOff();
      this.editEmail = true;
      this.setDefault();
      this.iconEmail = 'fa fa-check';
      this.labelEmail = 'Done';
    }
  }
  editPhones() {
    if (this.editPhone) {
      this.switchOff();
      this.iconPhone = 'fa fa-edit';
      this.labelPhone = 'Edit';
    } else {
      this.switchOff();
      this.editPhone = true;
      this.setDefault();
      this.iconPhone = 'fa fa-check';
      this.labelPhone = 'Done';
    }
  }
  editNames() {
    if (this.editName) {
      this.switchOff();
      this.iconName = 'fa fa-edit';
      this.labelName = 'Edit';    
    } else {
      this.switchOff();
       this.editName = true;
       this.setDefault();
      this.iconName = 'fa fa-check';
      this.labelName = 'Done';;
    }
  }
  editSurnames() {
    if (this.editSurname) {
      this.switchOff();
      this.iconSurname = 'fa fa-edit';
      this.labelSurname = 'Edit';
    } else {
      this.switchOff();
      this.editSurname = true;
      this.setDefault();
      this.iconSurname = 'fa fa-check';
      this.labelSurname = 'Done';
    }
  }
 
  onPicDrop() {
    this.profileImage = this.selectedProfile.source;
    this.messages.push({ severity: "info", summary: "New Profile", detail: `Changed pic to ${this.selectedProfile.title}` });
  }



}
