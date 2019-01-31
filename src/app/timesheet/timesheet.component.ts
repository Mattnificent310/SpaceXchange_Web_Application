import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MenuItem, TreeNode, ConfirmationService, Message, SelectItem } from 'primeng/primeng';
import { SampleProjectsData } from 'app/timesheet/sample.projects.data';
import { SamplePeopleData } from 'app/timesheet/sample.people.data';

declare var moment: any;

declare var google: any;

export enum PageNames {
  TimePage,
  ProjectPage,
  PlacePage,
  PeoplePage
}


@Component({
  selector: 'at-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css', '../../../node_modules/material-icons/iconfont/material-icons.css']
})
export class TimesheetComponent implements OnInit {
   userData: any;
   viewDetail: boolean;
   userTimeData = [

    { avatar: 'galleria5.jpg', month: 'January', day: 10, startTime: 'Pretoria', endTime: 'Bloemfontein',
      project: 'Cargo Transit', category: 'Road Freight' },
    { avatar: 'galleria4.jpg', month: 'February', day: 27, startTime: 'Johannesburg', endTime: 'Durban',
      project: 'Passenger Transit', category: 'Commuter Flight' },
    { avatar: 'galleria8.jpg', month: 'March', day: 6, startTime: 'Rustenburg', endTime: 'Brits',
      project: 'Cargo Transit', category: 'Air Freight' },
    { avatar: 'galleria13.jpg', month: 'April', day: 16, startTime: 'Krugersdorp', endTime: 'Witbank',
      project: 'Passenger Transit', category: 'Bus Trip' },
    { avatar: 'galleria1.jpg', month: 'May', day: 23, startTime: 'Harrismith', endTime: 'Clarens',
      project: 'Cargo Transit', category: 'Sea Freight' },
      { avatar: 'galleria5.jpg', month: 'January', day: 19, startTime: 'Pretoria', endTime: 'Bloemfontein',
      project: 'Cargo Transit', category: 'Road Freight' },
    { avatar: 'galleria4.jpg', month: 'February', day: 7, startTime: 'Johannesburg', endTime: 'Durban',
      project: 'Passenger Transit', category: 'Commuter Flight' },
    { avatar: 'galleria8.jpg', month: 'March', day: 14, startTime: 'Rustenburg', endTime: 'Brits',
      project: 'Cargo Transit', category: 'Air Freight' },
    { avatar: 'galleria13.jpg', month: 'April', day: 9, startTime: 'Krugersdorp', endTime: 'Witbank',
      project: 'Passenger Transit', category: 'Bus Trip' },
    { avatar: 'galleria1.jpg', month: 'May', day: 23, startTime: 'Harrismith', endTime: 'Clarens',
      project: 'Cargo Transit', category: 'Sea Freight' },
      { avatar: 'galleria5.jpg', month: 'January', day: 2, startTime: 'Pretoria', endTime: 'Bloemfontein',
      project: 'Cargo Transit', category: 'Road Freight' },
    { avatar: 'galleria4.jpg', month: 'February', day: 17, startTime: 'Johannesburg', endTime: 'Durban',
      project: 'Passenger Transit', category: 'Commuter Flight' },
    { avatar: 'galleria8.jpg', month: 'March', day: 26, startTime: 'Rustenburg', endTime: 'Brits',
      project: 'Cargo Transit', category: 'Air Freight' },
    { avatar: 'galleria13.jpg', month: 'April', day: 16, startTime: 'Krugersdorp', endTime: 'Witbank',
      project: 'Passenger Transit', category: 'Bus Trip' },
    { avatar: 'galleria1.jpg', month: 'May', day: 23, startTime: 'Harrismith', endTime: 'Clarens',
      project: 'Cargo Transit', category: 'Sea Freight' },
      { avatar: 'galleria5.jpg', month: 'January', day: 15, startTime: 'Pretoria', endTime: 'Bloemfontein',
      project: 'Cargo Transit', category: 'Road Freight' },
    { avatar: 'galleria4.jpg', month: 'February', day: 28, startTime: 'Johannesburg', endTime: 'Durban',
      project: 'Passenger Transit', category: 'Commuter Flight' },
    { avatar: 'galleria8.jpg', month: 'March', day: 19, startTime: 'Rustenburg', endTime: 'Brits',
      project: 'Cargo Transit', category: 'Air Freight' },
    { avatar: 'galleria13.jpg', month: 'April', day: 8, startTime: 'Krugersdorp', endTime: 'Witbank',
      project: 'Passenger Transit', category: 'Bus Trip' },
    { avatar: 'galleria1.jpg', month: 'May', day: 12, startTime: 'Harrismith', endTime: 'Clarens',
      project: 'Cargo Transit', category: 'Sea Freight' }

  ]

  months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octber', 'November', 'December'
  ]

  displayEditDialog = false;

  PageNames = PageNames;

  dialogPageIndex = PageNames.TimePage;

  dialogPages: MenuItem[] = [
    { label: 'Time' },
    { label: 'Transit Type' },
    { label: 'Place' },
    { label: 'People' }
  ];

   public headerConfig = {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
  };

   public events = [
    {
      title: 'Recent Trips',
      start: moment().format(), // '2017-06-02 07:00:00'
      end: moment().add(1, 'hour').format()
    }
  ]

  projectsTree: TreeNode[] = SampleProjectsData.projects;

  selectedProject: TreeNode;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;

    mapOptions = {

    center: { lat: -33.8688, lng: 151.2093 },
    zoom: 5
  };

  mapOverlays = [
    new google.maps.Marker({ position: { lat: -35.3075, lng: 149.124417 }, title: 'Canberra Mall' }),
    new google.maps.Marker({ position: { lat: -33.8688, lng: 151.2093 }, title: 'Sydney Harbour' }),
    new google.maps.Marker({ position: { lat: -37.813611, lng: 144.963056 }, title: 'Melbourne Stadium' }),
    new google.maps.Marker({ position: { lat: -28.016667, lng: 153.4 }, title: 'Gold Coast Beach' })
  ];

  people = SamplePeopleData.people;


  messages: Message[] = [];

  constructor(private confirmationService: ConfirmationService) {

  }
  ngOnInit() {
    this.viewDetail = false;
    this.userData = [

    { avatar: 'galleria5.jpg', month: 'January', day: 10, startTime: 'Pretoria', endTime: 'Bloemfontein',
      project: 'Cargo Transit', category: 'Road Freight' },
    ]; this.sortOptions = [
      { label: 'Newest First', value: '!day' },
      { label: 'Oldest First', value: 'day' },
      { label: 'Type', value: 'category' }
    ];
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  loadData() {
    this.userTimeData = [
      {
        avatar: 'galleria5.jpg', month: 'January', day: 10, startTime: 'Pretoria', endTime: 'Bloemfontein',
        project: 'Cargo Transit', category: 'Road Freight'
      },
      {
        avatar: 'galleria4.jpg', month: 'February', day: 27, startTime: 'Johannesburg', endTime: 'Durban',
        project: 'Passenger Transit', category: 'Commuter Flight'
      },
      {
        avatar: 'galleria8.jpg', month: 'March', day: 6, startTime: 'Rustenburg', endTime: 'Brits',
        project: 'Cargo Transit', category: 'Air Freight'
      },
      {
        avatar: 'galleria13.jpg', month: 'April', day: 16, startTime: 'Krugersdorp', endTime: 'Witbank',
        project: 'Passenger Transit', category: 'Bus Trip'
      },
      {
        avatar: 'galleria1.jpg', month: 'May', day: 23, startTime: 'Harrismith', endTime: 'Clarens',
        project: 'Cargo Transit', category: 'Sea Freight'
      },
      {
        avatar: 'galleria5.jpg', month: 'January', day: 19, startTime: 'Pretoria', endTime: 'Bloemfontein',
        project: 'Cargo Transit', category: 'Road Freight'
      },
      {
        avatar: 'galleria4.jpg', month: 'February', day: 7, startTime: 'Johannesburg', endTime: 'Durban',
        project: 'Passenger Transit', category: 'Commuter Flight'
      },
      {
        avatar: 'galleria8.jpg', month: 'March', day: 14, startTime: 'Rustenburg', endTime: 'Brits',
        project: 'Cargo Transit', category: 'Air Freight'
      },
      {
        avatar: 'galleria13.jpg', month: 'April', day: 9, startTime: 'Krugersdorp', endTime: 'Witbank',
        project: 'Passenger Transit', category: 'Bus Trip'
      },
      {
        avatar: 'galleria1.jpg', month: 'May', day: 23, startTime: 'Harrismith', endTime: 'Clarens',
        project: 'Cargo Transit', category: 'Sea Freight'
      },
      {
        avatar: 'galleria5.jpg', month: 'January', day: 2, startTime: 'Pretoria', endTime: 'Bloemfontein',
        project: 'Cargo Transit', category: 'Road Freight'
      },
      {
        avatar: 'galleria4.jpg', month: 'February', day: 17, startTime: 'Johannesburg', endTime: 'Durban',
        project: 'Passenger Transit', category: 'Commuter Flight'
      },
      {
        avatar: 'galleria8.jpg', month: 'March', day: 26, startTime: 'Rustenburg', endTime: 'Brits',
        project: 'Cargo Transit', category: 'Air Freight'
      },
      {
        avatar: 'galleria13.jpg', month: 'April', day: 16, startTime: 'Krugersdorp', endTime: 'Witbank',
        project: 'Passenger Transit', category: 'Bus Trip'
      },
      {
        avatar: 'galleria1.jpg', month: 'May', day: 23, startTime: 'Harrismith', endTime: 'Clarens',
        project: 'Cargo Transit', category: 'Sea Freight'
      },
      {
        avatar: 'galleria5.jpg', month: 'January', day: 15, startTime: 'Pretoria', endTime: 'Bloemfontein',
        project: 'Cargo Transit', category: 'Road Freight'
      },
      {
        avatar: 'galleria4.jpg', month: 'February', day: 28, startTime: 'Johannesburg', endTime: 'Durban',
        project: 'Passenger Transit', category: 'Commuter Flight'
      },
      {
        avatar: 'galleria8.jpg', month: 'March', day: 19, startTime: 'Rustenburg', endTime: 'Brits',
        project: 'Cargo Transit', category: 'Air Freight'
      },
      {
        avatar: 'galleria13.jpg', month: 'April', day: 8, startTime: 'Krugersdorp', endTime: 'Witbank',
        project: 'Passenger Transit', category: 'Bus Trip'
      },
      {
        avatar: 'galleria1.jpg', month: 'May', day: 12, startTime: 'Harrismith', endTime: 'Clarens',
        project: 'Cargo Transit', category: 'Sea Freight'
      }
    ];
  }
  getTimesForDay(tabName: string) {

    this.userTimeData.sort((a, b) => (b.day - a.day));

    return this.userTimeData.filter((row) => {
      return row.month === tabName;
    })
  }

  dateMonth = 'January';

  dateAndMonth = moment().month(this.dateMonth).format('MMMM, YYYY');

  onChangeTabs(event) {
    const index = event.index;
    this.dateMonth = this.months[index];
    this.dateAndMonth = moment().month(this.dateMonth).format('MMMM, YYYY');
    this.userTimeData = [];
    this.loadData();
  }

  cancelDialog() {

    this.confirmationService.confirm({
      header: 'Cancel Trip Creation',
      message: 'Cancel all changes. Are you sure?',
      accept: () => {
        this.displayEditDialog = false;
        this.messages.push({ severity: 'info', summary: 'Edits Cancelled', detail: 'No changes were saved' });
      },
      reject: () => {
        this.messages.push({ severity: 'warn', summary: 'Cancelled the Cancel', detail: 'Please continue your editing' });
        console.log('False cancel. Just keep editing.');
      }
    });


  }

  onMarkerClick(markerEvent) {

    const markerTitle = markerEvent.overlay.title;
    const markerPosition = markerEvent.overlay.position;

    alert(`You clicked on ${markerTitle} at ${markerPosition}`);

    markerEvent.map.panTo(markerPosition);
    markerEvent.map.setZoom(12);

  }

  saveNewEntry() {
    this.displayEditDialog = false;
    this.messages.push({ severity: 'success', summary: 'Entry Created', detail: 'Your entry has been created' });
  }

viewDetails(item: any) {
 this.userData = [];
 this.userData.push(item);
 this.viewDetail = true;
}


}
