import { BuyerService } from "./buyers/buyer.service";
import { OverlayPanel } from "primeng/overlaypanel";
import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { MenuItem, Message } from "primeng/primeng";
import { Menu } from "primeng/components/menu/menu";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Buyer } from "./buyers/buyer.model";

declare var jQuery: any;
export enum PageNames {
  Details,
  Password
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: [
    "./app.component.css",
    "../../node_modules/material-icons/iconfont/material-icons.css"
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  menuItems: MenuItem[];
  miniMenuItems: MenuItem[];
  items: MenuItem[];
  loginForm: FormGroup;
  registerForm: FormGroup;
  supplierForm: FormGroup;
  messages: Message[] = [];
  brands: string[] = [
    "Audi",
    "BMW",
    "Fiat",
    "Ford",
    "Honda",
    "Jaguar",
    "Mercedes",
    "Renault",
    "Volvo",
    "VW"
  ];

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

  dialogPages: MenuItem[];

  index: number;

  dialogPageIndex: number;

  PageNames = PageNames;

  loggedIn: String;

  name: string;

  surname: string;

  birth: string;

  email: string;

  phone: string;

  gender: string;

  password: string;

  avatar: string;

  selectedGender: any;

  genders: any[];

  @ViewChild("bigMenu") bigMenu: Menu;
  @ViewChild("smallMenu") smallMenu: Menu;
  @ViewChild("searchBox") searchBox: ElementRef;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private fb3: FormBuilder,
    private ngZone: NgZone,
    private http: HttpClient,
    private service: BuyerService
  ) {}
  renderForms() {
    this.loginForm = this.fb.group({
      names: [""],
      phoneNumber: ["", [Validators.required, Validators.minLength(10)]],
      emailAddress: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(10)]]
    });
    this.registerForm = this.fb2.group({
      regName: ["", [Validators.required, Validators.minLength(3)]],
      regSurname: ["", [Validators.required, Validators.minLength(3)]],
      regPhoneNumber: ["", [Validators.required, Validators.maxLength(10)]],
      regEmailAddress: ["", [Validators.required, Validators.minLength(10)]],
      regResAddress: ["", [Validators.required, Validators.minLength(10)]],
      regBirthDate: ["", [Validators.required, Validators.minLength(10)]],
      regGender: ["None", [Validators.required]],
      regPassword: ["", [Validators.required, Validators.minLength(10)]]
    });
    this.supplierForm = this.fb3.group({
      supName: ["", [Validators.required, Validators.minLength(3)]],
      supSurname: ["", [Validators.required, Validators.minLength(3)]],
      supPhoneNumber: ["", [Validators.required, Validators.maxLength(10)]],
      supEmailAddress: ["", [Validators.required, Validators.minLength(10)]],
      supResAddress: ["", [Validators.required, Validators.minLength(10)]],
      supBirthDate: ["", [Validators.required, Validators.minLength(10)]],
      supGender: ["None", [Validators.required]],
      supPassword: ["", [Validators.required, Validators.minLength(10)]]
    });
  }
  renderMenus() {
    if (localStorage.getItem("loggedIn") === "Buyer") {
      this.switchMenu("listings", "cubes", "My Listings");
    } else if (localStorage.getItem("loggedIn") === "Supplier") {
      this.switchMenu("listings", "cubes", "My Listings");
    } else {
      this.switchMenu("", "", "");
    }
  }
  switchMenu(item: string, icon: string, label: string) {
    const handleSelected = function(event) {
      const allMenus = jQuery(event.originalEvent.target).closest("ul");
      const allLinks = allMenus.find(".menu-selected");

      allLinks.removeClass("menu-selected");
      const selected = jQuery(event.originalEvent.target).closest("a");
      selected.addClass("menu-selected");
    };
    const handleSelect = function(event, id) {
      window.location.href = "landing/#" + id;
      const allMenus = jQuery(event.originalEvent.target).closest("ul");
      const allLinks = allMenus.find(".menu-selected");

      allLinks.removeClass("menu-selected");
      const selected = jQuery(event.originalEvent.target).closest("a");
      selected.addClass("menu-selected");
    };
    this.menuItems = [
      {
        label: "Dashboard",
        icon: "fa-home",
        routerLink: ["/dashboard"],
        command: event => handleSelected(event)
      },
      {
        label: label,
        icon: "fa-" + icon,
        routerLink: ["/" + item],
        command: event => handleSelected(event)
      },
      {
        label: "My Exchanges",
        icon: "fa-history",
        routerLink: ["/history"],
        command: event => handleSelected(event)
      },
      {
        label: "My Contacts",
        icon: "fa-users",
        routerLink: ["/contacts"],
        command: event => handleSelected(event)
      },
      {
        label: "Interaction Hub",
        icon: "fa-sitemap",
        routerLink: ["/interactions"],
        command: event => handleSelected(event)
      },
      {
        label: "My Profile",
        icon: "fa-street-view",
        routerLink: ["/profile"],
        command: event => handleSelected(event)
      },
      {
        label: "Settings",
        icon: "fa-sliders",
        routerLink: ["/settings"],
        command: event => handleSelected(event)
      }
    ];
    this.items = [
      {
        label: "Our Vision",
        icon: "fa-info",
        routerLink: ["/1"],
        command: event => handleSelect(event, "about")
      },
      {
        label: "Careers",
        icon: "fa-building",
        routerLink: ["/2"],
        command: event => handleSelect(event, "portfolio")
      },
      {
        label: "Services",
        icon: "fa-briefcase",
        routerLink: ["/3"],
        command: event => handleSelect(event, "services")
      },
      {
        label: "Contact Us",
        icon: "fa-comments",
        routerLink: ["/4"],
        command: event => handleSelect(event, "contact")
      }
    ];
  }
  ngOnInit() {
    this.loggedIn = "None";
    if (!localStorage.getItem("loggedIn")) {
      this.loggedIn = "None";
    }
    this.loggedIn =
      localStorage.getItem("loggedIn") === "Buyer" ? "Buyer" : "None";
    this.selectedGender = { name: "None", flag: "None.png" };
    this.genders = [
      { name: "Male", flag: "Male.png" },
      { name: "Female", flag: "Female_Icon.png" },
      { name: "None", flag: "None.png" }
    ];

    this.dialogPages = [
      {
        label: "Details"
      },
      {
        label: "Password"
      }
    ];
    this.index = 0;

    this.dialogPageIndex = this.PageNames.Details;

    this.renderMenus();
    this.renderForms();
    this.miniMenuItems = [];
    this.menuItems.forEach((item: MenuItem) => {
      const miniItem = { icon: item.icon, routerLink: item.routerLink };
      this.miniMenuItems.push(miniItem);
    });
    this.width = window;
    console.log(this.width);
    this.iconDate = "fa fa-edit";
    this.labelDate = "Edit";
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
      this.infoWindow.setContent("" + title + "");
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());
    }
  }

  addMarker() {
    const position = {
      lat: this.selectedPosition.lat(),
      lng: this.selectedPosition.lng()
    };
    this.overlays = [
      new google.maps.Marker({
        position: position,
        title: "Current Location",
        draggable: true
      })
    ];
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: position }, (results, status) => {
      this.location = results[0].formatted_address;
    });
  }
  searchMap() {
    const search = new google.maps.places.Autocomplete(
      this.searchBox.nativeElement,
      {
        types: ["address", "partial_matches", "formatted_address", "name"]
      }
    );
    search.addListener("place_changed", () => {
      this.ngZone.run(() => {
        const place: google.maps.places.PlaceResult = search.getPlace();
        const results = search.getPlace().geometry.location;
        const lat = results.lat;
        const lng = results.lng;
        this.selectedPosition = { lat: lat, lng: lng };
        this.overlays = [
          new google.maps.Marker({
            position: this.selectedPosition,
            title: "Searched Location",
            draggable: true
          })
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
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        const geocoder = new google.maps.Geocoder();
        const latlng = { lat: this.lat, lng: this.lng };
        geocoder.geocode({ location: latlng }, (results, status) => {
          this.location = results[0].formatted_address;
          this.overlays = [
            new google.maps.Marker({
              position: latlng,
              title: "Current Location",
              draggable: true
            })
          ];
          this.options = {
            center: { lat: this.lat, lng: this.lng },
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
      const position = marker.getPosition();
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: position }, (results, status) => {
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
      this.iconDate = "fa fa-calendar";
      this.registerForm.patchValue({ regDOB: this.date });
    } else {
      this.editDate = true;
      this.iconDate = "fa fa-check";
    }
  }
  selectCar(event, overlaypanel: OverlayPanel) {
    overlaypanel.toggle(event);
  }
  selectInitialMenuItemBasedOnUrl() {
    const path = document.location.pathname;
    const menuItem = this.menuItems.find(item => {
      return item.routerLink[0] === path;
    });
    if (menuItem) {
      const selectedIcon = this.bigMenu.container.querySelector(
        `.${menuItem.icon}`
      );
      jQuery(selectedIcon)
        .closest("li")
        .addClass("menu-selected");
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
    let name: string;

    this.service.getAllBuyers().subscribe(data => {
      this.buyer = data;
      this.buyer.forEach(item => {
        if (
          item.email === this.loginForm.controls["emailAddress"].value ||
          item.phone === this.loginForm.controls["phoneNumber"].value
        ) {
          if (item.password === this.loginForm.controls["password"].value) {
            console.log("POST Request is successful ", data);
            localStorage.setItem("names", item.name);
            localStorage.setItem("surnames", item.surname);
            localStorage.setItem("phones", item.phone);
            localStorage.setItem("emails", item.email);
            localStorage.setItem("birth", item.birthDate);
            localStorage.setItem("avatar", item.avatar);
            localStorage.setItem("gender", "None");
            localStorage.setItem("loggedIn", "Buyer");
            this.valid = true;
            name = item.name + " " + item.surname;
          }
        }
      });
      if (this.valid) {
        this.display = false;
        this.renderMenus();
        this.messages = [];
        this.messages.push({
          severity: "success",
          summary: `Welcome ${name}`,
          detail: "Your SpaceXperience starts now"
        });
        this.loggedIn = "Buyer";

        this.router.navigate(["dashboard"]);
      } else {
        this.messages = [];
        this.messages.push({
          severity: "warn",
          summary: `Sorry ${this.loginForm.controls["emailAddress"].value}`,
          detail: "Something went wrong during login"
        });
        this.index = 0;
      }
    });
  }
  hasRegFormErrors() {
    return !this.registerForm.valid;
  }
  hasSupFormErrors() {
    return !this.supplierForm.valid;
  }
  hasLoginErrors() {
    if (!this.loginForm.valid) {
      if (
        this.loginForm.controls["emailAddress"].valid &&
        !this.loginForm.controls["phoneNumber"].value
      ) {
        return !this.loginForm.controls["emailAddress"].valid;
      }
      if (
        this.loginForm.controls["phoneNumber"].valid &&
        !this.loginForm.controls["emailAddress"].value
      ) {
        return !this.loginForm.controls["phoneNumber"].valid;
      }
      if (
        this.loginForm.controls["phoneNumber"].valid &&
        this.loginForm.controls["emailAddress"].valid
      ) {
        this.messages = [];
        this.messages.push({
          severity: "warn",
          summary: `Note ${this.loginForm.controls["phoneNumber"].value} and ${
            this.loginForm.controls["emailAddress"].value
          }`,
          detail:
            "Enter either a valid mobile number or email address, not both"
        });
        return true;
      }
      return true;
    }
    return true;
  }
  hasPasswordErrors() {
    if (this.loginForm.controls["password"].valid) {
      return false;
    }
    return true;
  }
  logout() {
    this.hideMenu();
    this.valid = false;
    this.loggedIn = "None";
    this.index = 0;
    localStorage.setItem("loggedIn", null);
    localStorage.setItem("names", null);
    localStorage.setItem("surnames", null);
    localStorage.setItem("phones", null);
    localStorage.setItem("emails", null);
    localStorage.setItem("birth", null);
    localStorage.setItem("avatar", null);
    localStorage.setItem("gender", null);
    this.landed = false;
    this.messages = [];
    this.messages.push({
      severity: "info",
      summary: ` ${this.loginForm.controls["emailAddress"].value}`,
      detail: "Your SpaceXperience has been paused."
    });
    this.router.navigate(["landing"]);
  }
  extractForm(type) {
    if (type === "Buyer") {
      this.name = this.registerForm.controls["regName"].value;
      this.surname = this.registerForm.controls["regSurname"].value;
      this.birth = this.registerForm.controls["regBirthDate"].value;
      this.phone = this.registerForm.controls["regPhoneNumber"].value;
      this.email = this.registerForm.controls["regEmailAddress"].value;
      this.gender = this.registerForm.controls["regGender"].value.name;
      this.password = this.registerForm.controls["regPassword"].value;
      this.avatar =
        this.gender === "Male"
          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt"
          : "https://www.activehealthclinic.ca/storage/app/media/cartoon_avatar-blonde-female.png";
    } else if (type === "Supplier") {
      this.name = this.supplierForm.controls["supName"].value;
      this.surname = this.supplierForm.controls["supSurname"].value;
      this.birth = this.supplierForm.controls["supBirthDate"].value;
      this.phone = this.supplierForm.controls["supPhoneNumber"].value;
      this.email = this.supplierForm.controls["supEmailAddress"].value;
      this.gender = this.supplierForm.controls["supGender"].value.name;
      this.password = this.supplierForm.controls["supPassword"].value;
      this.avatar =
        this.gender === "Male"
          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt"
          : "https://www.activehealthclinic.ca/storage/app/media/cartoon_avatar-blonde-female.png";
    }
  }
  registerUser() {
    this.extractForm("Buyer");
    this.http
      .post("http://63.32.26.64:8083/users", {
        avatar: this.avatar,
        name: this.name,
        surname: this.surname,
        birthDate: this.birth,
        phone: this.phone,
        email: this.email,
        password: this.password
      })
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
          localStorage.setItem("names", this.name);
          localStorage.setItem("surnames", this.surname);
          localStorage.setItem("phones", this.phone);
          localStorage.setItem("emails", this.email);
          localStorage.setItem("birth", this.birth);
          localStorage.setItem("avatar", this.avatar);
          localStorage.setItem("gender", this.gender);
          this.messages = [];
          this.messages.push({
            severity: "success",
            summary: `Welcome ${this.name}`,
            detail: "You signed up for the ultimate SpaceXperience"
          });
        },
        error => {
          console.log("Error", error);
          this.messages = [];
          this.messages.push({
            severity: "warn",
            summary: `Sorry ${this.name}`,
            detail: "Something went wrong during registration"
          });
        }
      );
    this.register = false;
  }
  registerSup() {
    this.extractForm("Supplier");
    this.http
      .post("http://63.32.26.64:8083/users", {
        avatar: this.avatar,
        name: this.name,
        surname: this.surname,
        birthDate: this.birth,
        phone: this.phone,
        email: this.email,
        password: this.password
      })
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
          localStorage.setItem("names", this.name);
          localStorage.setItem("surnames", this.surname);
          localStorage.setItem("phones", this.phone);
          localStorage.setItem("emails", this.email);
          localStorage.setItem("birth", this.birth);
          localStorage.setItem("avatar", this.avatar);
          localStorage.setItem("gender", this.gender);
          this.messages = [];
          this.messages.push({
            severity: "success",
            summary: `Welcome ${this.name}`,
            detail: "You signed up for the ultimate SpaceXperience"
          });
        },
        error => {
          console.log("Error", error);
          this.messages = [];
          this.messages.push({
            severity: "warn",
            summary: `Sorry ${this.name}`,
            detail: "Something went wrong during registration"
          });
        }
      );
    this.register = false;
  }
  public hideMenu() {
    this.landed = !this.landed;
  }
  nextStep() {
    return this.index++;
  }
}
