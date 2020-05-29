import {Component, Inject, OnInit} from '@angular/core';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../room/room.component';
import {RoomService} from '../service/room.service';
import {TokenStorageService} from '../service/token-storage.service';
import {SensorService} from '../service/sensor.service';
import {FormControl, Validators} from '@angular/forms';
import {Sensor} from '../core/model/sensor.model';
import {Room} from '../core/model/room.model';
import {User} from '../core/model/user.model';

@Component({
  selector: 'app-sensor-form',
  templateUrl: './sensor-form.component.html',
  styleUrls: ['./sensor-form.component.css']
})
export class SensorFormComponent implements OnInit {
  matcher = new ErrorStateMatcher();
  nameControl = new FormControl('', Validators.required);
  mqttControl = new FormControl('', Validators.required);
  sensor: Sensor = new Sensor();
  room: Room = new Room();


  constructor(public dialogRef: MatDialogRef<SensorFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private sensorService: SensorService) { }

  ngOnInit() {
  }

  createSensor() {
    if (this.nameControl.valid === true) {
      this.room.id =  this.data.id;
      this.sensor.room = this.room;
      if (this.sensor.link == null) {
        this.sensor.link = 'https://image.flaticon.com/icons/svg/2933/2933465.svg';
      }
      this.sensorService.createSensor(this.sensor).subscribe(id => {
        this.dialogRef.close(id);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
