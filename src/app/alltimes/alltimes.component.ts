import { fadeAnimation } from './fade-animation';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, DataTable, LazyLoadEvent, Message } from 'primeng/primeng';
import Dexie from 'dexie';
import { Observable } from 'rxjs/Observable';
const MAX_EXAMPLE_RECORDS = 1000;

@Component({
  selector: 'at-alltimes',
  templateUrl: './alltimes.component.html',
  styleUrls: ['./alltimes.component.css', '../../../node_modules/material-icons/iconfont/material-icons.css']
})
export class AlltimesComponent implements OnInit {

  @ViewChild('dt') dt: DataTable;

  db: Dexie;
  viewDetail: boolean;
  avatar: String;
  user: String;
  project: String;
  category: String;
  startDate: String;
  endDate: String;
  startTime: String;
  endTime: String;
  depDate: String;
  email: String;
  names: string[] = ['Joe', 'Mary', 'Phil', 'Karen', 'Si', 'Tim', 'Rohit', 'Jenny', 'Kim', 'Greg', 'Danni'];
  allProjectNames = ['Recent', 'On Demand', 'Highest Ratings', 'Cargo Space', 'Passenger Space', 'Storage Space', 'Mixed Space'];
  phone: String;
  rating: number;
  messages: Message[];
  suppliers: any[] = [];
  allTimesheetData = [

    {
      id: 1, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
      user: this.names[0], project: this.allProjectNames[2], email: 'joe@gmail.com', category: 'Road Transit', startTime: '06:55',
      startLoc: 'Johannesburg', endTime: '07:35', endLoc: 'Pretoria', date: '2018-11-14', phone: '+27864253815', rating: 5
    },
    {
      id: 2, avatar: 'https://www.activehealthclinic.ca/storage/app/media/cartoon_avatar-blonde-female.png',
      user: this.names[1], project: this.allProjectNames[2], email: 'mary@gmail.com', category: 'Sea Transit', startTime: '17:10',
      startLoc: 'Cape Town', endTime: '21:40', endLoc: 'Mosselbay', date: '2018-12-16', phone: '+44851364917', rating: 5
    },
    {
      id: 3, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
      user: this.names[2], project: this.allProjectNames[1], email: 'phil@gmail.com', category: 'Air Transit', startTime: '14:15',
      startLoc: 'Bloemfontein', endTime: '17:45', endLoc: 'Harrismith', date: '2018-10-26', phone: '+11694235187', rating: 4.5
    },
    {
      id: 4, avatar: 'https://www.activehealthclinic.ca/storage/app/media/cartoon_avatar-blonde-female.png',
      user: this.names[3], project: this.allProjectNames[1], email: 'karen@gmail.com', category: 'Rail Transit', startTime: '14:55',
      startLoc: 'Kimberley', endTime: '19:25', endLoc: 'Upington', date: '2018-09-14', phone: '+37810549376', rating: 3
    },
    {
      id: 5, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
      user: this.names[4], project: this.allProjectNames[1], email: 'si@gmail.com', category: 'Road Transit', startTime: '13:15',
      startLoc: 'Johannesburg', endTime: '14:45', endLoc: 'Pretoria', date: '2018-11-14', phone: '+27864253815', rating: 4
    },
    {
      id: 6, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
      user: this.names[5], project: this.allProjectNames[0], email: 'tim@gmail.com', category: 'Sea Transit', startTime: '11:50',
      startLoc: 'Cape Town', endTime: '15:25', endLoc: 'Mosselbay', date: '2018-12-16', phone: '+44851364917', rating: 3
    },
    {
      id: 7, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
      user: this.names[6], project: this.allProjectNames[0], email: 'rohit@gmail.com', category: 'Air Transit', startTime: '14:35',
      startLoc: 'Bloemfontein', endTime: '17:45', endLoc: 'Harrismith', date: '2018-10-26', phone: '+11694235187', rating: 3.5
    },
    {
      id: 8, avatar: 'https://www.activehealthclinic.ca/storage/app/media/cartoon_avatar-blonde-female.png',
      user: this.names[7], project: this.allProjectNames[0], email: 'jenny@gmail.com', category: 'Rail Transit', startTime: '14:30',
      startLoc: 'Kimberley', endTime: '18:00', endLoc: 'Upington', date: '2018-10-14', phone: '+35781049376', rating: 4
    },

  ];
  allProjects = this.allProjectNames.map((proj) => {
    return { label: proj, value: proj }
  });

  selectedRows: Array<any>;

  contextMenu: MenuItem[];

  recordCount: number;

  constructor(private router: Router) {
    // for (let x = 0; x < 5; x++) {
    //   this.allTimesheetData = this.allTimesheetData.concat(this.allTimesheetData);
    // }

    this.recordCount = this.allTimesheetData.length;

    this.viewDetail = false;
  }



  viewDetails(id: number) {
    this.avatar = this.allTimesheetData[id].avatar;
    this.user = this.allTimesheetData[id].user;
    this.project = this.allTimesheetData[id].project;
    this.category = this.allTimesheetData[id].category;
    this.startTime = this.allTimesheetData[id].startTime;
    this.endTime = this.allTimesheetData[id].endTime;
    this.startDate = this.allTimesheetData[id].startLoc;
    this.endDate = this.allTimesheetData[id].endLoc;
    this.depDate = this.allTimesheetData[id].date;
    this.email = this.allTimesheetData[id].email;
    this.phone = this.allTimesheetData[id].phone;
    this.rating = this.allTimesheetData[id].rating;
    this.viewDetail = true;

  }
  generateRandomUser(id: number) {

    const names = ['James', 'Mandy', 'Pete', 'Kate', 'Si', 'Tim', 'Rohit', 'Jenny', 'Kim', 'Greg', 'Danni']
    const allProjectNames = ['Cargo Space', 'Passenger Space', 'Storage Space', 'Mixed Space'];
    const allCategories = ['Road Transit', 'Air Transit', 'Sea Transit', 'Rail Transit', 'All Terrain Transit', 'Storage'];
    const startLocations = ['Pretoria', 'Bloemfontein', 'Johannesburg', 'Durban', 'Cape Town', 'Kimberley'
      , 'Upington', 'Harrismith', 'East London', 'Port Elizabeth', 'Pierter Maritzburg', 'Rustenburg', 'Mosselbay'
      , 'George', 'Knysna', 'Pletenburg Bay', 'Wellington'];

    const endLocations = ['Wellington', 'Pletenburg Bay', 'Knysna', 'George', 'Mosselbay', 'Pierter Maritzburg'
      , 'Rustenburg', 'Port Elizabeth', 'East London', 'Harrismith', 'Upington', 'Kimberley', 'Cape Town', 'Durban'
      , 'Johannesburg', 'Bloemfontein', 'Pretoria'];
    const avatars = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
      'https://www.activehealthclinic.ca/storage/app/media/cartoon_avatar-blonde-female.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
      'https://www.activehealthclinic.ca/storage/app/media/cartoon_avatar-blonde-female.png',
      'https://www.activehealthclinic.ca/storage/app/media/cartoon_avatar-blonde-female.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
      'https://www.activehealthclinic.ca/storage/app/media/cartoon_avatar-blonde-female.png',
      'https://www.activehealthclinic.ca/storage/app/media/cartoon_avatar-blonde-female.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt'
    ];
    const emails = ['james@gmail.com', 'mandy@gmail.com', 'pete@gmail.com', 'kate@gmail.com', 'si@gmail.com', 'tim@gmail.com'
      , 'rohit@gamil.com', 'jenny@gmail.com', 'kim@gmail.com', 'greg@gmail.com', 'danni@gmail.com'];
    const phones = ['+35781049376', '+25581049854', '+35856049376', '+37581049376', '273580149367', '+55861149463'];
    const startTimes = ['09:15', '07:45', '08:55', '10:20', '11:35', '13:15',
      '09:40', '12:35', '10:30', '14:25', '07:45', '08:55', '11:35', '10:20', '15:25',
      '09:15', '12:30', '07:45', '08:55', '10:20', '15:25', '11:35', '13:15',
      '09:40', '12:35', '10:30', '14:25', '07:45', '08:55', '11:35'];
    const dates = ['2018-11-14', '2018-12-18', '2018-11-25', '2018-12-19', '2018-12-20', '2018-11-10', '2018-12-22'];
    const endTimes = ['12:30', '16:25', '18:40', '15:25', '16:25', '18:40', '15:40', '19:25',
      '16:25', '19:25', '20:35', '22:50', '21:25', '23:20', '20:15', '16:10', '22:15', '19:00', '21:15', '23:40'];
    const newUser = {
      id: id,
      avatar: avatars[id % avatars.length],
      user: names[id % names.length],
      project: allProjectNames[id % allProjectNames.length],
      email: emails[id % emails.length],
      category: allCategories[Math.floor(Math.random() * ( allCategories.length)) + 0],
      startTime: startTimes[id % startTimes.length],
      startLoc: startLocations[id % startLocations.length],
      endTime: endTimes[id % endTimes.length],
      endLoc: endLocations[id % endLocations.length],
      date: dates[id % dates.length],
      phone: phones[id % phones.length],
      rating: id % 5
    };

    this.allTimesheetData.push(newUser);

  }

  ngOnInit() {
    this.contextMenu = [
      { label: 'Debug', icon: 'fa-bug', command: (event) => this.onDebug(this.selectedRows) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.onDelete(this.selectedRows) }
    ];
    for (let x = 9; x < 50; x++) {
      this.generateRandomUser(x);
    }
  }

  onDebug(selectedRows: any) {
    console.log(JSON.stringify(selectedRows));
  }

  onDelete(selectedRows: any) {
    this.allTimesheetData = this.allTimesheetData.filter((row) => {
      return !selectedRows.includes(row);
    });
  }
  filterData(item: string) {
    const items: any[] = [];
    this.allTimesheetData.forEach(element => {
      if (item === element.project) {
        items.push(element);
      }
    });
    return items;
  }
  watch(user: any, date: any) {
    this.messages = [];
    this.messages.pop();
    this.messages.push({ severity: 'success', summary: 'Watchlist',
    detail: `You just added ${user}'s offer to your Watchlist. Remember to Book before ${date}` });
    this.viewDetail = false;
  }
  contact(name: any, phone: any, email: any) {
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('phone', phone);
    this.router.navigate(['/contacts']);
  }
  book() {
    this.router.navigate(['/bookings']);
  }

}
