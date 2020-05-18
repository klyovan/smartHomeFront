import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor() {
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [30, 25, 26, 25, 25, 27, 30], label: 'Max Humidity'},
    {data: [28, 24, 23, 24, 24, 21, 28], label: 'Min Humidity'}
  ];

  public barChartLabels1 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public barChartType1 = 'bar';
  public barChartLegend1 = true;
  public barChartData1 = [
    {data: [31, 26, 27, 26, 26, 28, 29], label: 'Max Temperature'},
    {data: [27, 23, 22, 23, 23, 22, 25], label: 'Min Temperature'}
  ];

  ngOnInit() {
  }

}
