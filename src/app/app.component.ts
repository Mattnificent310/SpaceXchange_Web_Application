import { OverlayPanel } from 'primeng/overlaypanel';
import {Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MenuItem, Message} from "primeng/primeng";
import {Menu} from "primeng/components/menu/menu";
import {ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { } from '@types/googlemaps';
declare var jQuery :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/material-icons/iconfont/material-icons.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  menuItems: MenuItem[];
  miniMenuItems: MenuItem[];
  items: MenuItem[];
  loginForm: FormGroup;
  registerForm: FormGroup;
  supplierForm: FormGroup;
  messages: Message[] = [];
    brands: string[] = ['Audi','BMW','Fiat','Ford','Honda','Jaguar','Mercedes','Renault','Volvo','VW'];

    filteredBrands: any[];

    brand: string;

    editDate: boolean;

    iconDate: String;

    labelDate: String;

    date: Date;

    options: any;

    overlays: any[];

    maps: boolean;

    lat: number;

    lng: number;

    map: google.maps.Map;

    location: any;

    selectedPosition: any;
    
    infoWindow: any;

    width: any;

    mobileSidebar: boolean;

  @ViewChild('bigMenu') bigMenu: Menu;
  @ViewChild('smallMenu') smallMenu: Menu;
  @ViewChild('searchBox') searchBox: ElementRef;

  constructor(private router : Router,private fb: FormBuilder, private fb2: FormBuilder,private fb3: FormBuilder, private ngZone: NgZone) {

  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      names: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      emailAddress: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      
    })
    this.registerForm = this.fb2.group({
      regName: ['', [Validators.required, Validators.minLength(3)]],
            regSurname: ['', [Validators.required, Validators.minLength(3)]],
      regPhoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      regEmailAddress: ['', [Validators.required, Validators.minLength(10)]],
      regResAddress: ['', [Validators.required, Validators.minLength(10)]],
      regBirthDate: ['', [Validators.required, Validators.minLength(10)]],
      regPassword: ['', [Validators.required, Validators.minLength(10)]],
      regConfirm: ['', [Validators.required, Validators.minLength(10)]]
        })
    this.supplierForm = this.fb3.group({
      supName: ['', [Validators.required, Validators.minLength(3)]],
      supSurname: ['', [Validators.required, Validators.minLength(3)]],
      supPhoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      supEmailAddress: ['', [Validators.required, Validators.minLength(10)]],
      supResAddress: ['', [Validators.required, Validators.minLength(10)]],
      supBirthDate: ['', [Validators.required, Validators.minLength(10)]],     
      supPassword: ['', [Validators.required, Validators.minLength(10)]],
      supConfirm: ['', [Validators.required, Validators.minLength(10)]],
    })
    let handleSelected = function(event) {
      let allMenus = jQuery(event.originalEvent.target).closest('ul');
      let allLinks = allMenus.find('.menu-selected');

      allLinks.removeClass("menu-selected");
      let selected = jQuery(event.originalEvent.target).closest('a');
      selected.addClass('menu-selected');
    }

    this.menuItems = [
      {label: 'Dashboard', icon: 'fa-home', routerLink: ['/dashboard'], command: (event) => handleSelected(event)},
      {label: 'Marketplace', icon: 'fa-tag', routerLink: ['/marketplace'], command: (event) => handleSelected(event)},
      {label: 'My Exchanges', icon: 'fa-clock-o', routerLink: ['/history'], command: (event) => handleSelected(event)},
      {label: 'My Contacts', icon: 'fa-users', routerLink: ['/contacts'], command: (event) => handleSelected(event)},
      {label: 'My Profile', icon: 'fa-edit', routerLink: ['/profile'], command: (event) => handleSelected(event)},
      {label: 'Settings', icon: 'fa-sliders', routerLink: ['/settings'], command: (event) => handleSelected(event)},
    ]
    this.items = [
      {label: 'Our Vision', icon: 'fa-info', routerLink: ['/dashboard/home'], command: (event) => handleSelected(event)},
      {label: 'Downloads', icon: 'fa-download', routerLink: ['/dashboard/downloads'], command: (event) => handleSelected(event)},
      {label: 'Services', icon: 'fa-briefcase', routerLink: ['/dashboard/services'], command: (event) => handleSelected(event)},
      {label: 'Contact Us', icon: 'fa-mobile', routerLink: ['/dashboard/contact'], command: (event) => handleSelected(event)}
    ]
    this.miniMenuItems = [];
    this.menuItems.forEach( (item : MenuItem) => {
      let miniItem = { icon: item.icon, routerLink: item.routerLink }
      this.miniMenuItems.push(miniItem);
    })
    this.width = window.innerWidth;
    console.log(this.width);
    this.iconDate = 'fa fa-edit';
    this.labelDate = 'Edit';
    this.editDate = false;
    this.maps = false;
    this.mobileSidebar = false;    
    this.lat = -26.1715046;
    this.lng = 27.9699844;
    this.infoWindow = new google.maps.InfoWindow();
    this.options = {
      center: {lat: this.lat, lng: this.lng},
      zoom: 12
  };
  this.searchMap();
    //this.findMe();
  }
  handleMapClick(event) {
    this.selectedPosition = event.latLng;
    this.addMarker();
}

handleOverlayClick(event) {
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
        let title = event.overlay.getTitle();
        this.infoWindow.setContent('' + title + '');
        this.infoWindow.open(event.map, event.overlay);
        event.map.setCenter(event.overlay.getPosition());
    }
}

addMarker() {
  let position = {lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng() };
    this.overlays = [ new google.maps.Marker(
      { position: position,
        title: 'Current Location', draggable: true })];
        let geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': position}, (results, status) => {
           this.location = results[0].formatted_address;
        });
      }
searchMap() {
  let search = new google.maps.places.Autocomplete(this.searchBox.nativeElement, {
    types: ['address', 'partial_matches', 'formatted_address', 'name']
  });
  search.addListener('place_changed', () => {
    this.ngZone.run(() => {
      let place: google.maps.places.PlaceResult = search.getPlace();
      let results = search.getPlace().geometry.location;
      let lat = results.lat;
      let lng = results.lng;
    this.selectedPosition = { lat: lat, lng: lng };
    this.overlays = [
      new google.maps.Marker({ position: this.selectedPosition, title: 'Searched Location', draggable: true}),
      ];
    })
  });
  
    this.map.panTo(this.selectedPosition);

}



  showMaps() {
    this.maps = true;
  }
  filterBrands(event) {
    this.filteredBrands = [];
    for (let i = 0; i < this.brands.length; i++) {
        let brand = this.brands[i];
        if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredBrands.push(brand);
          }
    }
}
 setMap(event) {
        this.map = event.map;
    }
findMe() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      let geocoder = new google.maps.Geocoder;
let latlng = {lat: this.lat, lng: this.lng};
geocoder.geocode({'location': latlng}, (results, status) => {
   this.location = results[0].formatted_address;
   this.overlays = [
    new google.maps.Marker({ position: latlng, title: 'Current Location', draggable: true}),
    ];
   this.options = {
    center: {lat: this.lat, lng: this.lng},
    zoom: 16
};
});

    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
handleDrag(event) {
this.overlays.forEach(marker => {
  let position = marker.getPosition();
  let geocoder = new google.maps.Geocoder;
geocoder.geocode({'location': position}, (results, status) => {
   this.location = results[0].formatted_address;
});
 });
}
selectAddress() {
  this.registerForm.patchValue({regResAddress: this.location});
  this.supplierForm.patchValue({supResAddress: this.location});
}
editDates() {
  if (this.editDate) {
    this.editDate = false;
    this.iconDate = 'fa fa-calendar';
    this.registerForm.patchValue({regDOB: this.date});
  } else {
    this.editDate = true;
    this.iconDate = 'fa fa-check';
  }
}
selectCar(event, overlaypanel: OverlayPanel) {
    overlaypanel.toggle(event);
}
  selectInitialMenuItemBasedOnUrl() {
    let path = document.location.pathname;
    let menuItem = this.menuItems.find( (item) => { return item.routerLink[0] == path });
    if (menuItem) {
      let selectedIcon = this.bigMenu.container.querySelector(`.${menuItem.icon}`);
      jQuery(selectedIcon).closest('li').addClass('menu-selected');
    }
  }
  ngAfterViewInit() {
    this.selectInitialMenuItemBasedOnUrl();
  }
  display: boolean = false;
  register: boolean = false;
  dispSup: boolean = false;
showDialog() {
    this.display = true;    
}
showRegister() {
  this.register = true;
}
showSidebar() {
this.mobileSidebar = true;
}
login() {
  this.messages.pop();
  this.messages.push({ severity: 'success', summary: `Welcome ${this.loginForm.controls['names'].value }`, detail: 'Your SpaceXperience starts now' });

  this.display = false;
  
}
}
