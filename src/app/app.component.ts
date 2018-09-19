import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MenuItem} from "primeng/primeng";
import {Menu} from "primeng/components/menu/menu";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuModule, MenubarModule} from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

declare var jQuery :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../../node_modules/material-icons/iconfont/material-icons.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  menuItems: MenuItem[];
  miniMenuItems: MenuItem[];
  items: MenuItem[];
  loginForm: FormGroup;
  
  @ViewChild('bigMenu') bigMenu : Menu;
  @ViewChild('smallMenu') smallMenu : Menu;

  constructor(private router : Router,private fb: FormBuilder) {

  }
  

  ngOnInit() {
    this.loginForm = this.fb.group({
      names: ['', [Validators.required, Validators.minLength(3)]],      
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      emailAddress: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      
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
      {label: 'Marketplace', icon: 'fa-money', routerLink: ['/alltimes'], command: (event) => handleSelected(event)},
      {label: 'My Exchanges', icon: 'fa-clock-o', routerLink: ['/timesheet'], command: (event) => handleSelected(event)},
      {label: 'My Contacts', icon: 'fa-tasks', routerLink: ['/projects'], command: (event) => handleSelected(event)},
      {label: 'My Profile', icon: 'fa-users', routerLink: ['/profile'], command: (event) => handleSelected(event)},
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

showDialog() {
    this.display = true;
}

onDialogClose(event) {
   this.display = event;
}



}
