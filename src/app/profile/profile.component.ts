import { ProfileService } from "./profile.service";
import { Component, OnInit } from "@angular/core";
import { Galleria, Message } from "primeng/primeng";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import uploadcareTabEffects from "uploadcare-widget-tab-effects";
import { RequestOptions, Headers } from "@angular/http";
import { IfObservable } from "rxjs/observable/IfObservable";

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
  editGender: boolean;
  editEmail: boolean;
  email: any;
  editPhone: boolean;
  phone: any;
  editName: boolean;
  name: any;
  editSurname: boolean;
  surname: any;
  iconDate: string;
  labelDate: String;
  iconGender: string;
  labelGender: string;
  iconEmail: string;
  labelEmail: string;
  iconPhone: string;
  labelPhone: string;
  iconName: string;
  labelName: string;
  iconSurname: string;
  labelSurname: string;
  changed: boolean;
  password: string;
  id: number;
  blockSpecial: RegExp = /^[a-z\d\-_\s]+$/i;
  uploadedFiles: any[] = [];
  genders: any[];
  selectedGender: any;
  images: any[];
  constructor(private fb: FormBuilder, private svc: ProfileService) {}
  setDefault() {
    this.iconDate = "fa fa-edit";
    this.labelDate = "Edit";
    this.iconGender = "fa fa-edit";
    this.labelGender = "Edit";
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
    this.editGender = false;
  }
  onUpload(event) {
    this.uploadedFiles.push(event.cdnUrl);
    this.profileImage = event.cdnUrl;
    localStorage.setItem("avatar", event.cdnUrl);
    this.images.push({
      source: event.cdnUrl,
      title: this.name + " " + this.surname
    });
    console.log(event);
  }
  ngOnInit() {
    this.id = Number(localStorage.getItem("userId"));
    this.name = !localStorage.getItem("names")
      ? ""
      : localStorage.getItem("names");
    this.surname = !localStorage.getItem("surnames")
      ? ""
      : localStorage.getItem("surnames");
    this.phone = !localStorage.getItem("phones")
      ? ""
      : localStorage.getItem("phones");
    this.email = !localStorage.getItem("emails")
      ? ""
      : localStorage.getItem("emails");
    this.date = new Date(
      !localStorage.getItem("birth")
        ? "2000-01-01"
        : localStorage.getItem("birth")
    );
    this.selectedProfile = !localStorage.getItem("avatar")
      ? ""
      : localStorage.getItem("avatar");
    this.selectedGender = {
      name: !localStorage.getItem("gender")
        ? "None"
        : localStorage.getItem("gender"),
      flag: "None.png"
    };
    this.profileImage = this.selectedProfile;
    if (!this.images) {
      this.images = [
        {
          source:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt",
          title: this.name + " " + this.surname
        },
        {
          source:
            "https://www.activehealthclinic.ca/storage/app/media/cartoon_avatar-blonde-female.png",
          title: this.name + " " + this.surname
        },
        {
          source: !localStorage.getItem("avatar")
            ? ""
            : localStorage.getItem("avatar"),
          title: this.name + " " + this.surname
        }
      ];
      this.changed = false;
      this.genders = [
        { name: "Male", flag: "Male.png" },
        { name: "Female", flag: "Female_Icon.png" },
        { name: "None", flag: "None.png" }
      ];
    }
    this.registerForm = this.fb.group({
      regName: [this.name, [Validators.required, Validators.minLength(3)]],
      regSurname: [
        this.surname,
        [Validators.required, Validators.minLength(3)]
      ],
      regPhoneNumber: [
        this.phone,
        [Validators.required, Validators.maxLength(10)]
      ],
      regEmailAddress: [
        this.email,
        [Validators.required, Validators.minLength(10)]
      ],
      regDOB: [this.date, [Validators.required, Validators.minLength(10)]],
      regGender: ["", [Validators.required]]
    });
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
  editGenders() {
    if (this.editGender) {
      this.switchOff();
      this.iconGender = "fa fa-edit";
      this.labelGender = "Edit";
      this.registerForm.patchValue({ regGender: this.selectedGender });
      this.changed = true;
    } else {
      this.switchOff();
      this.editGender = true;
      this.setDefault();
      this.iconGender = "fa fa-check";
      this.labelGender = "Done";
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
    this.images.forEach(item => {
      item.title = this.name + " " + this.surname;
    });
  }
  saveChanges() {
    localStorage.setItem("names", this.name);
    localStorage.setItem("surnames", this.surname);
    localStorage.setItem("phones", this.phone);
    localStorage.setItem("emails", this.email);
    localStorage.setItem("birth", this.date.toDateString());
    localStorage.setItem("avatar", this.profileImage);
    localStorage.setItem("gender", this.selectedGender.name);
    const profile = {
      id: this.id,
      avatar: this.profileImage,
      name: this.name,
      surname: this.surname,
      birthDate: this.date.toDateString(),
      gender: this.selectedGender.name,
      phone: this.phone,
      email: this.email,
      password: this.password
    };
    this.messages = [];
    this.svc.updateProfile(profile).subscribe(res => {
      if (res.ok) {
        this.messages.push({
          severity: "success",
          summary: "Saved Changes",
          detail: `Your changes has been discarded.`
        });
      }
    });
  }
  discardChanges() {
    this.changed = false;
    this.ngOnInit();
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
