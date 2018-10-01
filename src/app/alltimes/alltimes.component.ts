import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, DataTable, LazyLoadEvent } from "primeng/primeng";
import Dexie from 'dexie';
import {Observable} from 'rxjs/Observable';

const MAX_EXAMPLE_RECORDS = 1000;

@Component({
  selector: 'at-alltimes',
  templateUrl: './alltimes.component.html',
  styleUrls: ['./alltimes.component.css', '../../../node_modules/material-icons/iconfont/material-icons.css']
})
export class AlltimesComponent implements OnInit {

  @ViewChild("dt") dt : DataTable;

  db: Dexie;
  viewDetail: boolean;
  avatar: String;
  user: String;
  project: String;
  category: String;
  startDate: String;
  endDate: String;
  depDate: String;
  email: String;
  names: string[] = ['Joe', 'Mary', 'Phil', 'Karen', 'Si', 'Tim', 'Rohit', 'Jenny', 'Kim', 'Greg', 'Danni'];
  phone: String;
  rating: number;
  allTimesheetData = [

    {id: 1, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
    user: this.names[0], project: 'Cargo Space', email: 'joe@gmail.com', category: 'Road Transit', startTime: 'Johannesburg',
    endTime: 'Pretoria', date: '2018-11-14', phone: '+27864253815', rating: 3 },
    {id: 2, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
    user: this.names[1], project: 'Paasenger Space', email: 'mary@gmail.com', category: 'Sea Transit', startTime: 'Cape Town',
     endTime: 'Mosselbay', date: '2018-12-16', phone: '+44851364917', rating: 4 },
    {id: 3,avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
    user: this.names[2], project: 'Storage Space', email: 'phil@gmail.com', category: 'Air Transit', startTime: 'Bloemfontein',
    endTime: 'Harrismith', date: '2018-10-26', phone: '+11694235187', rating: 4.5 },
    {id: 4, avatar: 'https://www.activehealthclinic.ca/storage/app/media/cartoon_avatar-blonde-female.png',
    user: this.names[3], project: 'Mixed Space', email: 'karen@gmail.com', category: 'Rail Transit', startTime: 'Kimberley', 
    endTime: 'Upington', date: '2018-09-14', phone: '+37810549376', rating: 3 },
    {id: 5, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
    user: this.names[4], project: 'Cargo Space', email: 'si@gmail.com', category: 'Road Transit', startTime: 'Johannesburg',
    endTime: 'Pretoria', date: '2018-11-14', phone: '+27864253815', rating: 4 },
    {id: 6, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
    user: this.names[5], project: 'Paasenger Space', email: 'tim@gmail.com', category: 'Sea Transit', startTime: 'Cape Town',
     endTime: 'Mosselbay', date: '2018-12-16', phone: '+44851364917', rating: 3 },
    {id: 7,avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt',
    user: this.names[6], project: 'Storage Space', email: 'rohit@gmail.com', category: 'Air Transit', startTime: 'Bloemfontein',
    endTime: 'Harrismith', date: '2018-10-26', phone: '+11694235187', rating: 3.5 },
    {id: 8, avatar: 'https://www.activehealthclinic.ca/storage/app/media/cartoon_avatar-blonde-female.png',
    user: this.names[7], project: 'Mixed Space', email: 'jenny@gmail.com', category: 'Rail Transit', startTime: 'Kimberley', 
    endTime: 'Upington', date: '2018-10-14', phone: '+35781049376', rating: 4 },

  ];
  allData = [

    {id: 1, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt', user: 'Glen',
     project: 'Cargo Space', category: 'Road Transit', startTime: 'Johannesburg', endTime: 'Pretoria', date: 1434243 },
    {id: 2, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt', user: 'Karen',
     project: 'Paasenger Space', category: 'Sea Transit', startTime: 'Cape Town', endTime: 'Mosselbay', date: 1434243 },
    {id: 3, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt', user: 'Si',
     project: 'Storage Space', category: 'Air Transit', startTime: 'Bloemfontein', endTime: 'Harrismith', date: 1434243 },
    {id: 4, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt', user: 'Rohit',
     project: 'Mixed Space', category: 'Rail Transit', startTime: 'Kimberley', endTime: 'Upington', date: 1434243 },

  ];

  allProjectNames = ['Recent', 'On Demand', 'Highest Ratings', 'Cargo Space', 'Passenger Space', 'Storage Space', 'Mixed Space'];

  allProjects = this.allProjectNames.map((proj) => {
    return { label: proj, value: proj }
  });

  selectedRows: Array<any>;

  contextMenu: MenuItem[];

  recordCount: number;
  
  constructor() {
    // for (let x = 0; x < 5; x++) {
    //   this.allTimesheetData = this.allTimesheetData.concat(this.allTimesheetData);
    // }
    
    this.recordCount = this.allTimesheetData.length;
    this.configureDatabase();
    this.populateDatabase();
    this.viewDetail = false;
  }

  private configureDatabase() {

    this.db = new Dexie('AgileTimes');

    // Define a schema
    this.db.version(1).stores({
      timesheet: 'id,user,project,category,startTime,endTime,date'
    });

  }

   private populateDatabase() {

    this.getRecordCount().then((count) => {
      this.recordCount = count;
      if (!count) {
        this.resetDatabase();
      }
    });

  }
  viewDetails(id: number) {
    this.avatar = this.allTimesheetData[id].avatar;
    this.user = this.allTimesheetData[id].user;
    this.project = this.allTimesheetData[id].project;
    this.category = this.allTimesheetData[id].category;
    this.startDate = this.allTimesheetData[id].startTime;
    this.endDate = this.allTimesheetData[id].endTime;
    this.depDate = this.allTimesheetData[id].date;
    this.email = this.allTimesheetData[id].email;
    this.phone = this.allTimesheetData[id].phone;
    this.rating = this.allTimesheetData[id].rating;
    this.viewDetail = true;
  }
  generateRandomUser(id: number) {

    var names = ["Joe", "Mary", "Phil", "Karen", "Si", "Tim", "Rohit", "Jenny", "Kim", "Greg", "Danni"]
    var allProjectNames = ['Cargo Space', 'Passenger Space', 'Storage Space', 'Mixed Space'];
    var allCategories = ['Road Transit', 'Air Transit', 'Sea Transit', 'Rail Transit'];
    var startLocations = ['Pretoria', 'Bloemfontein', 'Johannesburg', 'Durban', 'Cape Town', 'Kimberley', 'Upington', 'Harrismith', 'East London', 'Port Elizabeth', 'Pierter Maritzburg', 'Rustenburg', 'Mosselbay', 'George', 'Knysna', 'Pletenburg Bay', 'Wellington'];
 
      var endLocations = ['Wellington', 'Pletenburg Bay', 'Knysna','George','Mosselbay','Pierter Maritzburg','Rustenburg','Port Elizabeth','East London','Harrismith', 'Upington','Kimberley','Cape Town','Durban','Johannesburg','Bloemfontein', 'Pretoria'];
    let newUser = {
      id: id,
      user: names[id % names.length],
      project: allProjectNames[id % allProjectNames.length],
      category: allCategories[id % allCategories.length],
      startTime: startLocations[id % startLocations.length],
      endTime: endLocations[id % endLocations.length],
      date: Math.round(Math.random() * 100000)
    };
    
    return newUser;

  }

 

  getRecordCount(): Dexie.Promise<number> {
    return this.db.table("timesheet").count();
  }

   resetDatabase() {

    let that = this;

    this.dt.loading = true;

    this.db.table("timesheet").clear().then(() => {
      console.log("Database Cleared");
      Observable.range(0, MAX_EXAMPLE_RECORDS).do(
        function (id) {
          let randomUser = that.generateRandomUser(id);
          that.db.table("timesheet").add(randomUser);
          if (id % 100 == 0) {
            that.getRecordCount().then((count) => {
              that.recordCount = count;
            })
          }

        },
        function (err) {
          console.log("Do Error: %s", err);
        },
        function () {
          console.log("Do complete");
          that.dt.loading = false;
          that.dt.reset();
        }).subscribe(() => {
          console.log("Finished Reset database");
          that.getRecordCount().then((count) => {
            that.recordCount = count;
          })
        });
    })
  }

  loadTimes(event: LazyLoadEvent) {

    console.log(JSON.stringify(event));

    let table = this.db.table("timesheet");

    var query: any;

    // Dexie doesn't support ordering AND filtering, so we branch here
    // Alternative strategies here: https://github.com/dfahlander/Dexie.js/issues/297
    if (event.filters && event.filters["project"]) {
      query = table.where("project").equals(event.filters["project"]["value"]);
    } else if (event.globalFilter) {
      query = table.where("project").startsWithIgnoreCase(event.globalFilter)
        .or("user").startsWithIgnoreCase(event.globalFilter)
        .or("category").startsWithIgnoreCase(event.globalFilter);
    } else {
      query = table.orderBy(event.sortField);
    }

    query = query
      .offset(event.first)
      .limit(event.rows);

    if (event.sortOrder == -1) {
      query = query.reverse();
    };

    query.toArray((nextBlockOfTimes) => {
      // console.log("Loaded times: %s", JSON.stringify(nextBlockOfTimes));
      this.allTimesheetData = nextBlockOfTimes;
    });
  }


  ngOnInit() {
    this.contextMenu = [
      { label: 'Debug', icon: 'fa-bug', command: (event) => this.onDebug(this.selectedRows) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.onDelete(this.selectedRows) }
    ];

  }

  onDebug(selectedRows: any) {
    console.log(JSON.stringify(selectedRows));
  }

  onDelete(selectedRows: any) {
    this.allTimesheetData = this.allTimesheetData.filter((row) => {
      return !selectedRows.includes(row);
    });
  }



  onEditComplete(editInfo) {
    let fieldChanged = editInfo.column.field;
    let newRowValues = editInfo.data;
    alert(`You edited ${fieldChanged} to ${newRowValues[fieldChanged]}`);
  }

  onRowSelect(rowInfo) {
    //console.log(JSON.stringify(rowInfo.data)); // or this.selectedRow
  }
 




}