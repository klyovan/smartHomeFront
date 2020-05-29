import {Component, OnDestroy, OnInit} from '@angular/core';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {Subscription} from 'rxjs';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {Location} from '@angular/common';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnDestroy {


  constructor(private _mqttService: MqttService, private _location: Location, authService: AuthService) {
    this.tempSubscription = this._mqttService.observe('klyovan/smarthome/room1/temp').subscribe((message: IMqttMessage) => {
      this.temperature.push(message.payload.toString());
      this.today = new Date();
      this.h = this.today.getHours();
      this.m = this.today.getMinutes();
      this.s = this.today.getSeconds();
      this.m = ReportsComponent.checkTime(this.m);
      this.s = ReportsComponent.checkTime(this.s);

      this.dates.push(this.h + ':' + this.m + ':' + this.s);
      console.log(this.temperature);
      if (this.temperature.length > 105) {
        this.temperature = [];
        this.dates = [];
        this.lineChartLabels = this.dates;
        this.tempLineChartData = [
          {data: this.temperature}
        ];
      }
    });
    this.humSubscription = this._mqttService.observe('klyovan/smarthome/room1/humidity').subscribe((message: IMqttMessage) => {
      this.humidity.push(message.payload.toString());
      if (this.humidity.length > 105) {
        this.humidity = [];
        this.dates = [];
        this.lineChartLabels = this.dates;
        this.humLineChartData = [
          {data: this.humidity}
        ];

      }
      console.log(this.humidity);
    });
  }


  private tempSubscription: Subscription;
  private humSubscription: Subscription;
  public temperature = [];
  public humidity = [];
  public dates = [];
  public today: Date;
  h: number;
  m: number;
  s: number;

  public tempLineChartData: ChartDataSets[] = [
    {data: this.temperature}
  ];

  public humLineChartData: ChartDataSets[] = [
    {data: this.humidity}
  ];

  public lineChartLabels: Label[] = this.dates;
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: {
      annotations: [],
    },
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#fafafa',
      backgroundColor: this.getRandomColor(),
    },
  ];

  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  public static checkTime(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  backClicked() {
    this._location.back();
  }

   getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  ngOnInit() {

  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  public ngOnDestroy() {
    this.tempSubscription.unsubscribe();
    this.humSubscription.unsubscribe();
  }
}
