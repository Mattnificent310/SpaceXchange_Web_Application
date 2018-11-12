import { BuyerService } from './buyers/buyer.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuItem, Message } from 'primeng/primeng';
import { Menu } from 'primeng/components/menu/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Buyer } from './buyers/buyer.model';

declare var jQuery: any;

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
  brands: string[] = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];

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

  display: boolean;

  register: boolean;

  dispSup: boolean;

  buyer: Buyer[];

  valid: boolean;

  public landed: boolean;

  blockSpecial: RegExp = /^[a-z\d\-_\s]+$/i;


  @ViewChild('bigMenu') bigMenu: Menu;
  @ViewChild('smallMenu') smallMenu: Menu;
  @ViewChild('searchBox') searchBox: ElementRef;

  constructor(private router: Router, private fb: FormBuilder, private fb2: FormBuilder, private fb3: FormBuilder, private ngZone: NgZone,
    private http: HttpClient, private service: BuyerService) {

  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      names: [''],
      phoneNumber: [''],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]],

    });
    this.registerForm = this.fb2.group({
      regName: ['', [Validators.required, Validators.minLength(3)]],
      regSurname: ['', [Validators.required, Validators.minLength(3)]],
      regPhoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      regEmailAddress: ['', [Validators.required, Validators.minLength(10)]],
      regResAddress: ['', [Validators.required, Validators.minLength(10)]],
      regBirthDate: ['', [Validators.required, Validators.minLength(10)]],
      regPassword: ['', [Validators.required, Validators.minLength(10)]],
      regConfirm: ['', [Validators.required, Validators.minLength(10)]]
    });
    this.supplierForm = this.fb3.group({
      supName: ['', [Validators.required, Validators.minLength(3)]],
      supSurname: ['', [Validators.required, Validators.minLength(3)]],
      supPhoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      supEmailAddress: ['', [Validators.required, Validators.minLength(10)]],
      supResAddress: ['', [Validators.required, Validators.minLength(10)]],
      supBirthDate: ['', [Validators.required, Validators.minLength(10)]],
      supPassword: ['', [Validators.required, Validators.minLength(10)]],
      supConfirm: ['', [Validators.required, Validators.minLength(10)]],
    });
    const handleSelected = function (event) {
      const allMenus = jQuery(event.originalEvent.target).closest('ul');
      const allLinks = allMenus.find('.menu-selected');

      allLinks.removeClass('menu-selected');
      const selected = jQuery(event.originalEvent.target).closest('a');
      selected.addClass('menu-selected');
    };
if (sessionStorage.getItem('loggedIn') == 'Supplier') {
    this.menuItems = [
      { label: 'Dashboard', icon: 'fa-home', routerLink: ['/dashboard'], command: (event) => handleSelected(event) },
      { label: 'Marketplace', icon: 'fa-tag',
      routerLink: ['/marketplace'], command: (event) => handleSelected(event) },
      { label: 'My Exchanges', icon: 'fa-clock-o', routerLink: ['/history'], command: (event) => handleSelected(event) },
      { label: 'My Contacts', icon: 'fa-users', routerLink: ['/contacts'], command: (event) => handleSelected(event) },
      { label: 'My Profile', icon: 'fa-edit', routerLink: ['/profile'], command: (event) => handleSelected(event) },
      { label: 'Settings', icon: 'fa-sliders', routerLink: ['/settings'], command: (event) => handleSelected(event) },
    ];
    this.items = [
      { label: 'Our Vision', icon: 'fa-info', routerLink: ['/dashboard'], command: (event) => handleSelected(event) },
      { label: 'Downloads', icon: 'fa-download', routerLink: ['/dashboard'], command: (event) => handleSelected(event) },
      { label: 'Services', icon: 'fa-briefcase', routerLink: ['/dashboard'], command: (event) => handleSelected(event) },
      { label: 'Contact Us', icon: 'fa-mobile', routerLink: ['/dashboard'], command: (event) => handleSelected(event) }
    ];
  }
  if (sessionStorage.getItem('loggedIn') == 'Buyer') {
    this.menuItems = [
      { label: 'Dashboard', icon: 'fa-home', routerLink: ['/dashboard'], command: (event) => handleSelected(event) },
      { label: 'My Listings', icon: 'fa-tag',
      routerLink: ['/listings'], command: (event) => handleSelected(event) },
      { label: 'My Exchanges', icon: 'fa-clock-o', routerLink: ['/history'], command: (event) => handleSelected(event) },
      { label: 'My Contacts', icon: 'fa-users', routerLink: ['/contacts'], command: (event) => handleSelected(event) },
      { label: 'My Profile', icon: 'fa-edit', routerLink: ['/profile'], command: (event) => handleSelected(event) },
      { label: 'Settings', icon: 'fa-sliders', routerLink: ['/settings'], command: (event) => handleSelected(event) },
    ];
    this.items = [
      { label: 'Our Vision', icon: 'fa-info', routerLink: ['/dashboard'], command: (event) => handleSelected(event) },
      { label: 'Downloads', icon: 'fa-download', routerLink: ['/dashboard'], command: (event) => handleSelected(event) },
      { label: 'Services', icon: 'fa-briefcase', routerLink: ['/dashboard'], command: (event) => handleSelected(event) },
      { label: 'Contact Us', icon: 'fa-mobile', routerLink: ['/dashboard'], command: (event) => handleSelected(event) }
    ];
  }
    this.miniMenuItems = [];
    this.menuItems.forEach((item: MenuItem) => {
      const miniItem = { icon: item.icon, routerLink: item.routerLink };
      this.miniMenuItems.push(miniItem);
    });
    this.width = window.innerWidth;
    console.log(this.width);
    this.iconDate = 'fa fa-edit';
    this.labelDate = 'Edit';
    this.editDate = false;
    this.maps = false;
    this.mobileSidebar = false;
    this.display = false;
    this.register = false;
    this.dispSup = false;
    this.valid = false;
    this.landed = false;

    this.buyer = [];
    this.lat = -26.1715046;
    this.lng = 27.9699844;
    this.infoWindow = new google.maps.InfoWindow();
    this.options = {
      center: { lat: this.lat, lng: this.lng },
      zoom: 12
    };
    this.findMe();
  }
  handleMapClick(event) {
    this.selectedPosition = event.latLng;
    this.addMarker();
  }

  handleOverlayClick(event) {
    const isMarker = event.overlay.getTitle !== undefined;

    if (isMarker) {
      const title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());
    }
  }

  addMarker() {
    const position = { lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng() };
    this.overlays = [new google.maps.Marker(
      {
        position: position,
        title: 'Current Location', draggable: true
      })];
    const geocoder = new google.maps.Geocoder;
    geocoder.geocode({ 'location': position }, (results, status) => {
      this.location = results[0].formatted_address;
    });
  }
  searchMap() {
    const search = new google.maps.places.Autocomplete(this.searchBox.nativeElement, {
      types: ['address', 'partial_matches', 'formatted_address', 'name']
    });
    search.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place: google.maps.places.PlaceResult = search.getPlace();
        const results = search.getPlace().geometry.location;
        const lat = results.lat;
        const lng = results.lng;
        this.selectedPosition = { lat: lat, lng: lng };
        this.overlays = [
          new google.maps.Marker({ position: this.selectedPosition, title: 'Searched Location', draggable: true }),
        ];
      });
    });

    this.map.panTo(this.selectedPosition);

  }



  showMaps() {
    this.maps = true;
  }
  filterBrands(event) {
    this.filteredBrands = [];
    for (let i = 0; i < this.brands.length; i++) {
      const brand = this.brands[i];
      if (brand.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
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
        const geocoder = new google.maps.Geocoder;
        const latlng = { lat: this.lat, lng: this.lng };
        geocoder.geocode({ 'location': latlng }, (results, status) => {
          this.location = results[0].formatted_address;
          this.overlays = [
            new google.maps.Marker({ position: latlng, title: 'Current Location', draggable: true }),
          ];
          this.options = {
            center: { lat: this.lat, lng: this.lng },
            zoom: 16
          };
        });

      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  handleDrag(event) {
    this.overlays.forEach(marker => {
      const position = marker.getPosition();
      const geocoder = new google.maps.Geocoder;
      geocoder.geocode({ 'location': position }, (results, status) => {
        this.location = results[0].formatted_address;
      });
    });
  }
  selectAddress() {
    this.registerForm.patchValue({ regResAddress: this.location });
    this.supplierForm.patchValue({ supResAddress: this.location });
  }
  editDates() {
    if (this.editDate) {
      this.editDate = false;
      this.iconDate = 'fa fa-calendar';
      this.registerForm.patchValue({ regDOB: this.date });
    } else {
      this.editDate = true;
      this.iconDate = 'fa fa-check';
    }
  }
  selectCar(event, overlaypanel: OverlayPanel) {
    overlaypanel.toggle(event);
  }
  selectInitialMenuItemBasedOnUrl() {
    const path = document.location.pathname;
    const menuItem = this.menuItems.find((item) => { return item.routerLink[0] === path; });
    if (menuItem) {
      const selectedIcon = this.bigMenu.container.querySelector(`.${menuItem.icon}`);
      jQuery(selectedIcon).closest('li').addClass('menu-selected');
    }
  }
  ngAfterViewInit() {
    this.selectInitialMenuItemBasedOnUrl();
  }

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
    let name: String;
    this.service.getAllBuyers().subscribe(
      data => {
        this.buyer = data;
        this.buyer.forEach(item => {
          if (item.email === this.loginForm.controls['emailAddress'].value) {
            if (item.password === this.loginForm.controls['password'].value) {
              console.log("POST Request is successful ", data);
              this.valid = true;
              name = item.name + ' ' + item.surname;
            }
          }
        });
        if (this.valid) {
          this.display = false;
          this.messages = [];
          this.messages.push({
            severity: 'success',
            summary: `Welcome ${name}`,
            detail: 'Your SpaceXperience starts now'
          });

        } else {
          this.messages = [];
          this.messages.push({
            severity: 'warn',
            summary: `Sorry ${this.loginForm.controls['emailAddress'].value}`,
            detail: 'Something went wrong during login'
          });
          this.router.navigate(['/dashboard']);
        }
      });
      sessionStorage.setItem('loggedIn', 'Buyer');


    this.router.navigate(['dashboard']);
  }
  hasRegFormErrors() {
    return !this.registerForm.valid;
  }
  hasSupFormErrors() {
    return !this.supplierForm.valid;
  }
  hasLoginErrors() {

    if(!this.loginForm.valid)
    {
    if(!this.loginForm.controls['names'].value)
    {
      if(!this.loginForm.controls['emailAddress'].value && this.loginForm.controls['phoneNumber'].value && this.loginForm.controls['password'].value)
      {
        return false;
      }
      if(!this.loginForm.controls['phoneNumber'].value && this.loginForm.controls['emailAddress'].value && this.loginForm.controls['password'].value)
      {
        return false;
      }
      return true;
    }
    return false;
    }
    return true;
  }
  logout() {
    this.hideMenu();
    this.valid = false;
    this.messages = [];
    this.messages.push({
      severity: 'info',
      summary: ` ${this.loginForm.controls['emailAddress'].value}`,
      detail: 'Your SpaceXperience has been paused.'
    });

  }
  registerUser() {
    this.http.post('http://18.203.81.222:8083/users',
      {
        "avatar": "string",
        "name": this.registerForm.controls['regName'].value,
        "surname": this.registerForm.controls['regSurname'].value,
        "birthDate": this.registerForm.controls['regBirthDate'].value,
        "phone": this.registerForm.controls['regPhoneNumber'].value,
        "email": this.registerForm.controls['regEmailAddress'].value,
        "password": this.registerForm.controls['regPassword'].value
      })
      .subscribe(
        data => {
          console.log('POST Request is successful ', data);

          this.messages.push({
            severity: 'success',
            summary: `Welcome ${this.registerForm.controls['regName'].value}`,
            detail: 'You signed up for the ultimate SpaceXperience'
          });
        },
        error => {
          console.log("Error", error);
          this.messages = [];
          this.messages.push({
            severity: 'warn',
            summary: `Sorry ${this.registerForm.controls['regName'].value}`,
            detail: 'Something went wrong during registration'
          });
        }
      );
    this.register = false;
  }
  public hideMenu() {
    this.landed = !this.landed;
  }
}
