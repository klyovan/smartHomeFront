import {Component, OnInit} from '@angular/core';
import {MqttService} from 'ngx-mqtt';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {SensorService} from '../service/sensor.service';
import {Sensor} from '../core/model/sensor.model';
import {MatDialog} from '@angular/material';
import {RoomFormComponent} from '../room-form/room-form.component';
import {SensorFormComponent} from '../sensor-form/sensor-form.component';
import {ConfirmDeleteComponent} from '../confirm-delete/confirm-delete.component';
import {AuthService} from '../service/auth.service';
import {RoomService} from '../service/room.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  ledModel = [];
  spinner = [];
  id: number;
  sensors: Array<Sensor>;
  isLoggedIn: boolean;
  isAdmin: boolean;



  constructor(private mqttService: MqttService, private _location: Location,
              private route: ActivatedRoute, private sensorService: SensorService, roomService: RoomService,
              public dialog: MatDialog, private authService: AuthService) {
    this.isLoggedIn = authService.isLogged;
    this.isAdmin = this.authService.isAdmin;
    route.params.subscribe(value => {
      this.id = +value.id;
      sensorService.getSensors(this.id).subscribe((sensors: any) => {
          this.sensors = sensors;
          for (let i = 0; i < this.sensors.length; i++) {
            this.ledModel[i] = false;
            this.spinner[i] = false;
          }
          console.log(this.sensors);
        }
      );

    });

  }

  public publish(topic: string, msgOn: string, msgOff, i: number) {
    console.log(i);
    console.log(this.ledModel);
    if (this.ledModel[i] === true) {
      console.log('ahtrue');

      this.spinner[i] = true;
      setTimeout(() => {
        this.unsafePublish(topic, msgOff);
        this.spinner[i] = false;
      }, 3000);

    } else if (this.ledModel[i] === false) {
      console.log('ahfalse');

      this.spinner[i] = true;
      setTimeout(() => {
        this.unsafePublish(topic, msgOn);
        this.spinner[i] = false;
      }, 3000);
    }
  }

  public unsafePublish(topic: string, message: string): void {
    this.mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  backClicked() {
    this._location.back();
  }

  createSensor(): void {
    const dialogRef = this.dialog.open(SensorFormComponent, {
      width: '500px',
      data: {action: 'create', id: this.id}
    });

    dialogRef.afterClosed().subscribe(value => {
      this.sensorService.getSensors(this.id).subscribe((sensors: any) => {
        this.sensors = sensors;
      });
    });
  }

  deleteSensor(sensorName, sensorId): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '500px',
      data: {action: 'deleteSensor', text: sensorName, id: sensorId}
    });
    dialogRef.afterClosed().subscribe(value => {
      this.sensorService.getSensors(this.id).subscribe((sensors: any) => {
        this.sensors = sensors;
      });
    });
  }

  ngOnInit() {

  }

}
