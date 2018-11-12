import { Message, SelectItem } from 'primeng/primeng';
import { SamplePeopleData } from './../timesheet/sample.people.data';
import { SampleProjectsData } from 'app/timesheet/sample.projects.data';
import { ConfirmationService, MenuItem, TreeNode } from 'primeng/primeng';
import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";

declare var moment: any;

declare var google: any;
export enum PageNames {
  TimePage,
  ProjectPage,
  OriginPage,
  DestinationPage,
  PeoplePage
}
@Component({
  selector: "app-construction",
  templateUrl: "./construction.component.html",
  styleUrls: ["./construction.component.css"]
})


export class ConstructionComponent implements OnInit {

  options: any;

  overlays: any[];

  maps: boolean;

  lat: number;

  lng: number;

  map: google.maps.Map;

  location: any;

  selectedPosition: any;

  index: number;

  infoWindow: any;

  transTypes: SelectItem[];

  selectedTrans: String;

  ngOnInit() {
    this.lat = -26.1715046;
    this.lng = 27.9699844;
    this.infoWindow = new google.maps.InfoWindow();
    this.options = {
      center: { lat: this.lat, lng: this.lng },
      zoom: 12
    };
    this.index = 1;
    this.transTypes = [
      {label: 'Road Transit', value: 'galleria5'},
      {label: 'Rail Transit', value: 'galleria3'},
      {label: 'Sea Transit', value: 'galleria1'},
      {label: 'Air Transit', value: 'galleria4'},
      {label: 'Static Storage', value: 'galleria2'}
  ];

    console.log(this.dialogPageIndex);
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




  showMaps() {
    this.maps = true;
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

  displayEditDialog = true;

  PageNames = PageNames;

  dialogPageIndex = PageNames.TimePage;

  dialogPages: MenuItem[] = [
    { label: 'Time' },
    { label: 'Space Category' },
    { label: 'Origin' },
    { label: "Destination"},
    { label: 'Specifications' }
  ];

   public headerConfig = {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
  };

   public events = [
    {
      title: 'Departure',
      start: moment().format(), // '2017-06-02 07:00:00'
      end: moment().add(0.5, 'hour').format()
    },
    {
      title: 'Arrival',
      start: moment().format(), // '2017-06-02 07:00:00'
      end: moment().add(0.5, 'hour').format()
    }
  ]

  projectsTree: TreeNode[] = SampleProjectsData.projects;

  selectedProject: TreeNode;



  people = SamplePeopleData.people;


  messages: Message[] = [];


  constructor(private router: Router, private confirmationService: ConfirmationService) {

  }
  getTimesForDay(tabName: string) {
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
    this.index = 1;
    this.messages = [];
    this.messages.push({ severity: 'success', summary: 'Entry Created', detail: 'Your entry has been created' });
  }

nextStep()  {
  return this.index++;
}

  goBack() {
    this.router.navigate(['/listings']);
  }
}
