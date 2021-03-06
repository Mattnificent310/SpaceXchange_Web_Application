import { AppComponent } from './../app.component';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"]
})

export class LandingComponent implements OnInit {
  images: any[];
  showGallaria: boolean;
  showAbout: boolean;
  showSvc: boolean;
  showPort: boolean;
  constructor(private myApp: AppComponent) {

  }


  ngOnInit() {
    this.showGallaria = false;
    this.showAbout = false;
    this.showSvc = false;
    this.showPort = false;
    this.myApp.hideMenu();
    this.images = [];
    this.images.push({source: '../../assets/img/galleria1.webp', alt: 'Description for Image 1', title:'Title 1'});
    this.images.push({ source: '../../assets/img/galleria2.webp', alt: 'Description for Image 2', title:'Title 2'});
    this.images.push({ source: '../../assets/img/galleria3.webp', alt: 'Description for Image 3', title:'Title 3'});
    this.images.push({ source: '../../assets/img/galleria4.webp', alt: 'Description for Image 4', title:'Title 4'});
    this.images.push({ source: '../../assets/img/galleria5.webp', alt: 'Description for Image 5', title:'Title 5'});
    this.images.push({ source: '../../assets/img/galleria6.webp', alt: 'Description for Image 6', title:'Title 6'});
    this.images.push({ source: '../../assets/img/galleria7.webp', alt: 'Description for Image 7', title:'Title 7'});
    this.images.push({ source: '../../assets/img/galleria8.webp', alt: 'Description for Image 8', title:'Title 8'});
    this.images.push({ source: '../../assets/img/galleria9.webp', alt: 'Description for Image 9', title:'Title 9'});
    this.images.push({ source: '../../assets/img/galleria10.webp', alt: 'Description for Image 10', title:'Title 10'});
    this.images.push({ source: '../../assets/img/galleria11.webp', alt: 'Description for Image 11', title:'Title 11'});
    this.images.push({ source: '../../assets/img/galleria12.webp', alt: 'Description for Image 12', title:'Title 12'});

  }

  scrollTop(event) {
    const scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 50); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
}
}
