import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, DataTable, LazyLoadEvent } from "primeng/primeng";
import Dexie from 'dexie';
import {Observable} from 'rxjs/Observable';

const MAX_EXAMPLE_RECORDS = 1000;

@Component({
  selector: 'at-alltimes',
  templateUrl: './alltimes.component.html',
  styleUrls: ['./alltimes.component.css']
})
export class AlltimesComponent implements OnInit {

  @ViewChild("dt") dt : DataTable;

  db: Dexie;

  allTimesheetData = [

    {avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt', user: 'Glen',
     project: 'Cargo Space', category: 'Road Transit', startTime: 'Johannesburg', endTime: 'Pretoria', date: 1434243 },
    { avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt', user: 'Karen',
     project: 'Paasenger Space', category: 'Sea Transit', startTime: 'Cape Town', endTime: 'Mosselbay', date: 1434243 },
    { avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt', user: 'Si',
     project: 'Storage Space', category: 'Air Transit', startTime: 'Bloemfontein', endTime: 'Harrismith', date: 1434243 },
    { avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePYH0l73i-OgzhmHIgztXFb6p2wZFfcAETx9-AL4Y3ndU-KLt', user: 'Rohit',
     project: 'Mixed Space', category: 'Rail Transit', startTime: 'Kimberley', endTime: 'Upington', date: 1434243 },

  ];

  allProjectNames = ['Recent', 'Cargo Space', 'Passenger Space', 'Storage Space', 'Mixed Space'];

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