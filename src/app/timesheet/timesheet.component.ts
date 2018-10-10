import { Component } from '@angular/core';
import { MenuItem, TreeNode, ConfirmationService, Message } from 'primeng/primeng';
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
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent {

   userTimeData = [

    { month: 'January', day: '10', startTime: 'Pretoria', endTime: 'Bloemfontein', project: 'Cargo Transit', category: 'Road Freight' },
    { month: 'February', day: '27', startTime: 'Johannesburg', endTime: 'Durban', project: 'Passenger Transit', category: 'Car Pool' },
    { month: 'March', day: '6', startTime: 'Rustenburg', endTime: 'Brits', project: 'Cargo Transit', category: 'Air Freight' },
    { month: 'April', day: '16', startTime: 'Krugersdorp', endTime: 'Witbank', project: 'Passenger Transit', category: 'Bus Trip' },
    { month: 'May', day: '23', startTime: 'Harrismith', endTime: 'Clarens', project: 'Cargo Transit', category: 'Sea Freight' },

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

  getTimesForDay(tabName: string) {
    return this.userTimeData.filter((row) => {
      return row.month === tabName;
    })
  }

  dateMonth = 'January';

  dateAndMonth = moment().month(this.dateMonth).format('MMMM, YYYY');

  onChangeTabs(event) {
    let index = event.index;
    this.dateMonth = this.months[index];
    this.dateAndMonth = moment().month(this.dateMonth).format('MMMM, YYYY');
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

    let markerTitle = markerEvent.overlay.title;
    let markerPosition = markerEvent.overlay.position;

    alert(`You clicked on ${markerTitle} at ${markerPosition}`);

    markerEvent.map.panTo(markerPosition);
    markerEvent.map.setZoom(12);

  }

  saveNewEntry() {
    this.displayEditDialog = false;
    this.messages.push({ severity: 'success', summary: 'Entry Created', detail: 'Your entry has been created' });
  }




}
