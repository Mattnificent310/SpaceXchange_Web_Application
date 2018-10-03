import { OverlayPanel } from 'primeng/overlaypanel';
import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MenuItem, MenuModule, MenubarModule, Message} from "primeng/primeng";
import {Menu} from "primeng/components/menu/menu";
import {ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
    
  
  @ViewChild('bigMenu') bigMenu : Menu;
  @ViewChild('smallMenu') smallMenu : Menu;

  constructor(private router : Router,private fb: FormBuilder, private fb2: FormBuilder,private fb3: FormBuilder) {

  }
  

  ngOnInit() {
    this.loginForm = this.fb.group({
      names: ['', [Validators.required, Validators.minLength(3)]],      
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      emailAddress: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      
    })
    this.registerForm = this.fb2.group({
      regName: ['', [Validators.required, Validators.minLength(3)]],
            regSurname: ['', [Validators.required, Validators.minLength(3)]],
      regPhoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      regEmailAddress: ['', [Validators.required, Validators.minLength(10)]],
      regResAddress: ['', [Validators.required, Validators.minLength(10)]],
      regBillAddress: ['', [Validators.required, Validators.minLength(10)]],
      regPassword: ['', [Validators.required, Validators.minLength(10)]],
      regConfirm: ['', [Validators.required, Validators.minLength(10)]]
        })
    this.supplierForm = this.fb3.group({
      supName: ['', [Validators.required, Validators.minLength(3)]],
      supSurname: ['', [Validators.required, Validators.minLength(3)]],
      supPhoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      supEmailAddress: ['', [Validators.required, Validators.minLength(10)]],
      regResAddress: ['', [Validators.required, Validators.minLength(10)]],
      regBillAddress: ['', [Validators.required, Validators.minLength(10)]],     
      supPassword: ['', [Validators.required, Validators.minLength(10)]],
      supConfirm:     [Validators.required, Validators.minLength(10)]]
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
      {label: 'Services', icon: 'fa-briefcase', routerLink: ['/dashboard/services'], command: (event) => handleSelected(event)}
    ]
    this.miniMenuItems = [];
    this.menuItems.forEach( (item : MenuItem) => {
      let miniItem = { icon: item.icon, routerLink: item.routerLink }
      this.miniMenuItems.push(miniItem);
    })

  }
  filterBrands(event) {
    this.filteredBrands = [];
    for(let i = 0; i < this.brands.length; i++) {
        let brand = this.brands[i];
        if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredBrands.push(brand);
          }
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
login() {
  this.messages.pop();
  this.messages.push({ severity: 'success', summary: `Welcome ${this.loginForm.controls['names'].value }`, detail: 'Your SpaceXperience starts now' });

  this.display = false;
  
}
