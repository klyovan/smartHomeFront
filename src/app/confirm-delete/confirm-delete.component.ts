import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RoomService} from '../service/room.service';
import {log} from 'util';
import {SensorService} from '../service/sensor.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private roomService: RoomService, private sensorService: SensorService) {
    console.log(this.data);
  }

  ngOnInit() {
  }

  onYesClick(): void {
    if (this.data.action === 'deleteRoom') {
      this.roomService.deleteRoom(this.data.id).subscribe(value => this.data.id = 0);
    } else if (this.data.action === 'deleteSensor') {
      this.sensorService.deleteSensor(this.data.id).subscribe(value => this.data.id = 0);

    }

    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
