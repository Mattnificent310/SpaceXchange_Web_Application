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
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      regName: ['', [Validators.required, Validators.minLength(3)]],      
      regSurname: ['', [Validators.required, Validators.minLength(3)]],      
      regPhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      regEmailAddress: ['', [Validators.required, Validators.minLength(10)]],
      regPassword: ['', [Validators.required, Validators.minLength(10)]],      
    })
  }

  onImageSelected(event) {
    console.log(JSON.stringify(event));
  }

  onDragStart(galleria) {
    this.selectedProfile = this.images[galleria.activeIndex];
    galleria.stopSlideshow();
  }

  onPicDrop() {
    this.profileImage = this.selectedProfile.source;
    this.messages.push({ severity: "info", summary: "New Profile", detail: `Changed pic to ${this.selectedProfile.title}` });
  }



}
