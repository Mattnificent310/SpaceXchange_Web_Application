import { Component, OnInit } from '@angular/core';
import { Galleria, Message } from "primeng/primeng";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from '@angular/platform-browser';
import uploadcareTabEffects from 'uploadcare-widget-tab-effects';

@Component({
  selector: "at-profile",
  templateUrl: "./profile.component.html",
  styleUrls: [
    "./profile.component.css",
    "../../../node_modules/material-icons/iconfont/material-icons.css"
  ]
})
export class ProfileComponent implements OnInit {
  profileImage: any;
  selectedProfile: any;
  messages: Message[] = [];
  registerForm: FormGroup;
  date: Date;
  editDate: boolean;
  editEmail: boolean;
  email: any;
  editPhone: boolean;
  phone: any;
  editName: boolean;
  name: any;
  editSurname: boolean;
  surname: any;
  iconDate: String;
  labelDate: String;
  iconEmail: String;
  labelEmail: String;
  iconPhone: String;
  labelPhone: String;
  iconName: String;
  labelName: String;
  iconSurname: String;
  labelSurname: String;
  changed: boolean;
  blockSpecial: RegExp = /^[a-z\d\-_\s]+$/i;
  uploadedFiles: any[] = [];
  images: any[];
  constructor(private fb: FormBuilder) {}
  setDefault() {
    this.iconDate = "fa fa-edit";
    this.labelDate = "Edit";
    this.iconEmail = "fa fa-edit";
    this.labelEmail = "Edit";
    this.iconPhone = "fa fa-edit";
    this.labelPhone = "Edit";
    this.labelName = "Edit";
    this.iconName = "fa fa-edit";
    this.labelSurname = "Edit";
    this.iconSurname = "fa fa-edit";
  }
  switchOff() {
    this.editName = false;
    this.editSurname = false;
    this.editEmail = false;
    this.editPhone = false;
    this.editDate = false;
  }
  onUpload(event) {
    this.uploadedFiles.push(event.cdnUrl);
    this.profileImage = event.cdnUrl;
    localStorage.setItem('avatar', event.cdnUrl);
    this.images.push({
      source: event.cdnUrl,
      title: this.name + ' ' + this.surname });
      console.log(event);

  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      regName: ["", [Validators.required, Validators.minLength(3)]],
      regSurname: ["", [Validators.required, Validators.minLength(3)]],
      regPhoneNumber: ["", [Validators.required, Validators.maxLength(10)]],
      regEmailAddress: ["", [Validators.required, Validators.minLength(10)]],
      regDOB: ["", [Validators.required, Validators.minLength(10)]]
    });
    this.name = !localStorage.getItem("names")
      ? "My Name"
      : localStorage.getItem("names");
    this.surname = !localStorage.getItem("surnames")
      ? "My Surname"
      : localStorage.getItem("surnames");
    this.phone = !localStorage.getItem("phones")
      ? "123-456-7890"
      : localStorage.getItem("phones");
    this.email = !localStorage.getItem("emails")
      ? "example@domain.com"
      : localStorage.getItem("emails");
      this.date = new Date(!localStorage.getItem('birth') ? '2000-01-01' : localStorage.getItem('birth'));
    this.selectedProfile = !localStorage.getItem("avatar")
      ? ""
      : localStorage.getItem("avatar");
    this.profileImage = this.selectedProfile;
    this.images = [];
    this.images.push({ source:
       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt",
    title: this.name + " " + this.surname },
    { source: 'https://www.activehealthclinic.ca/storage/app/media/cartoon_avatar-blonde-female.png',
      title: this.name + ' ' + this.surname },
     { source: !localStorage.getItem("avatar")
     ? "" : localStorage.getItem("avatar"),
     title: this.name + " " + this.surname });
    this.changed = false;
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
      this.iconDate = "fa fa-edit";
      this.labelDate = "Edit";
      this.registerForm.patchValue({ regDOB: this.date });
      this.changed = true;
    } else {
      this.switchOff();
      this.editDate = true;
      this.setDefault();
      this.iconDate = "fa fa-check";
      this.labelDate = "Done";
    }
  }
  editEmails() {
    if (this.editEmail) {
      this.switchOff();
      this.iconEmail = "fa fa-edit";
      this.labelEmail = "Edit";
      this.email = this.registerForm.controls["regEmailAddress"].value;
      this.changed = true;
    } else {
      this.switchOff();
      this.editEmail = true;
      this.setDefault();
      this.iconEmail = "fa fa-check";
      this.labelEmail = "Done";
    }
  }
  editPhones() {
    if (this.editPhone) {
      this.switchOff();
      this.iconPhone = "fa fa-edit";
      this.labelPhone = "Edit";
      this.phone = this.registerForm.controls["regPhoneNumber"].value;
      this.changed = true;
    } else {
      this.switchOff();
      this.editPhone = true;
      this.setDefault();
      this.iconPhone = "fa fa-check";
      this.labelPhone = "Done";
    }
  }
  editNames() {
    if (this.editName) {
      this.switchOff();
      this.iconName = "fa fa-edit";
      this.labelName = "Edit";
      this.name = this.registerForm.controls["regName"].value;
      this.changed = true;
      this.editTitle();
    } else {
      this.switchOff();
      this.editName = true;
      this.setDefault();
      this.iconName = "fa fa-check";
      this.labelName = "Done";
    }
  }
  editSurnames() {
    if (this.editSurname) {
      this.switchOff();
      this.iconSurname = "fa fa-edit";
      this.labelSurname = "Edit";
      this.surname = this.registerForm.controls["regSurname"].value;
      this.changed = true;
      this.editTitle();
    } else {
      this.switchOff();
      this.editSurname = true;
      this.setDefault();
      this.iconSurname = "fa fa-check";
      this.labelSurname = "Done";
    }
  }
  editTitle() {
    this.images.forEach((item) => {
      item.title = this.name + ' ' + this.surname;
    })
  }
  saveChanges() {
    localStorage.setItem("names", this.name);
    localStorage.setItem("surnames", this.surname);
    localStorage.setItem("phones", this.phone);
    localStorage.setItem("emails", this.email);
    localStorage.setItem("birth", this.date.toDateString());
    localStorage.setItem("avatar", this.profileImage);
    this.messages = [];
    this.messages.pop();
    this.messages.push({
      severity: "success",
      summary: "Saved Changes",
      detail: `Your new details have been saved.`
    });
  }
  discardChanges() {
    this.messages = [];
    this.messages.push({
      severity: "warn",
      summary: "Reverted Changes",
      detail: `Your changes has been discarded.`
    });
  }
  onPicDrop() {
    this.profileImage = this.selectedProfile.source;
    this.messages = [];
    this.messages.push({
      severity: "info",
      summary: "New Profile",
      detail: `Changed pic to ${this.selectedProfile.title}`
    });
  }
}
