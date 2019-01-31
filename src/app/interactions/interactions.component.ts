import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-interactions",
  templateUrl: "./interactions.component.html",
  styleUrls: ["./interactions.component.css"]
})
export class InteractionsComponent implements OnInit {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  date: number;
  hour: number;
  minute: number;
  second: number;
  day: number;
  images: any[];
    constructor() {}

  ngOnInit() {
    this.hours = 24;
    this.minutes = 60;
    this.seconds = 60;
    this.hour = new Date().getHours().valueOf();
    this.minute = new Date().getMinutes().valueOf();
    this.second = new Date().getSeconds();
    this.days = this.getDate();
    this.images = [];
    this.images.push({ source: '../../assets/img/galleria1.jpg', alt: 'Description for Image 1', title: 'Title 1' });
    this.images.push({ source: '../../assets/img/galleria2.jpg', alt: 'Description for Image 2', title: 'Title 2' });
    this.images.push({ source: '../../assets/img/galleria3.jpg', alt: 'Description for Image 3', title: 'Title 3' });
    this.images.push({ source: '../../assets/img/galleria4.jpg', alt: 'Description for Image 4', title: 'Title 4' });
    this.images.push({ source: '../../assets/img/galleria5.jpg', alt: 'Description for Image 5', title: 'Title 5' });
    this.images.push({ source: '../../assets/img/galleria6.jpg', alt: 'Description for Image 6', title: 'Title 6' });
    this.images.push({ source: '../../assets/img/galleria7.jpg', alt: 'Description for Image 7', title: 'Title 7' });
    this.images.push({ source: '../../assets/img/galleria8.jpg', alt: 'Description for Image 8', title: 'Title 8' });
    this.images.push({ source: '../../assets/img/galleria9.jpg', alt: 'Description for Image 9', title: 'Title 9' });
    this.images.push({ source: '../../assets/img/galleria10.jpg', alt: 'Description for Image 10', title: 'Title 10' });
    this.images.push({ source: '../../assets/img/galleria11.jpg', alt: 'Description for Image 11', title: 'Title 11' });
    this.images.push({ source: '../../assets/img/galleria12.jpg', alt: 'Description for Image 12', title: 'Title 12' });

  }
  getDate() {
    this.date = new Date().getTime();
    this.day = new Date(2019, 4, 30).getTime();
    return this.day - this.date;
  }
  changeDays(event) {
    this.days = Math.round(this.getDate() / (1000 * 60 * 60 * 24));
  }
  changeHours(event) {
    const date = new Date().getHours();
    this.hours = 24 - date;
  }
  changeMinutes(event) {
   const date = new Date().getMinutes();
   this.minutes = 60 - date;
  }
changeSeconds(event) {
   const date = new Date().getSeconds();
   this.seconds = 60 - date;
  }
}
