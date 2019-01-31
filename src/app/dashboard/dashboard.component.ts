import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UIChart } from "primeng/primeng";
import {Observable} from 'rxjs/Observable';
import '../rxjs-operators';



const DEFAULT_COLORS = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
  '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
  '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
  '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']


@Component({
  selector: 'at-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild("mixedChart") mixedChart: UIChart;

  hoursByProject = [
    { id: 1, name: 'Long Distance', hoursSpent: 8 },
    { id: 2, name: 'City To City', hoursSpent: 16 },
    { id: 3, name: 'Inter-City', hoursSpent: 24 },
  ]
  numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
  math = Math;
  contacts: number;
  exchanges: number;
  online: number;
  onTheWay: number;
  chartOptions = {
    title: {
      display: true,
      text: 'Cargo Transit'
    },
    legend: {
      position: 'bottom'
    },
  };

  pieLabels = this.hoursByProject.map((proj) => proj.name);

  pieData = this.hoursByProject.map((proj) => proj.hoursSpent);

  pieColors = this.configureDefaultColours(this.pieData);


  private configureDefaultColours(data: number[]): string[] {
    let customColours = []
    if (data.length) {

      customColours = data.map((element, idx) => {
        return DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
      });
    }

    return customColours;
  }



  hoursByProjectChartData = {
    labels: this.pieLabels,
    datasets: [
      {
        data: this.pieData,
        backgroundColor: this.pieColors
      }
    ]
  }


  hoursByTeamChartData = {

    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Packages',
        backgroundColor: DEFAULT_COLORS[0],
        data: [65, 59, 80, 55, 67, 73]
      },
      {
        label: 'Passengers',
        backgroundColor: DEFAULT_COLORS[1],
        data: [44, 63, 57, 90, 77, 70]
      }
    ]

  }

  hoursByTeamChartDataMixed = {

    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Packages',
        type: 'bar',
        backgroundColor: DEFAULT_COLORS[0],
        data: [65, 59, 80, 55, 67, 73]
      },
      {
        label: 'Passengers',
        type: 'line',
        backgroundColor: DEFAULT_COLORS[1],
        data: [44, 63, 57, 90, 77, 70]
      }
    ]

  }

  onDataSelect(event) {

    let dataSetIndex = event.element._datasetIndex;
    let dataItemIndex = event.element._index;

    let labelClicked = this.hoursByTeamChartDataMixed.datasets[dataSetIndex].label;
    let valueClicked = this.hoursByTeamChartDataMixed.datasets[dataSetIndex].data[dataItemIndex];

    alert(`Looks like ${labelClicked} worked ${valueClicked} hours`);
  }


  ngAfterViewInit() {
    Observable.interval(3000).timeInterval().subscribe(() => {

      var hoursByTeam = this.hoursByTeamChartDataMixed.datasets;
      var randomised = hoursByTeam.map((dataset) => {

        dataset.data = dataset.data.map((hours) => hours * (Math.random() * 2));

      });
      this.mixedChart.refresh();
    });

  }



}
