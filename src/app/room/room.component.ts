import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../service/room.service';
import {Room} from '../core/model/room.model';
import {MatDialog} from '@angular/material';
import {RoomFormComponent} from '../room-form/room-form.component';
import {ConfirmDeleteComponent} from '../confirm-delete/confirm-delete.component';
import {AuthService} from '../service/auth.service';

export interface DialogData {
  action: string;
  text: string;
  id: bigint;
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})


export class RoomComponent implements OnInit {
  rooms: Array<Room>;
  action: string;

  constructor(private _location: Location, private route: ActivatedRoute, private roomService: RoomService,
              public dialog: MatDialog, private authService: AuthService) {
    this.roomService.getRooms().subscribe((value: any) => {
      console.log('nacahl');
      this.rooms = value;
      console.log(this.rooms);
    });
  }

  createRoom(): void {
    const dialogRef = this.dialog.open(RoomFormComponent, {
      width: '500px',
      data: {action: 'create'}
    });

    dialogRef.afterClosed().subscribe(room => {
      this.roomService.getRooms().subscribe((rooms: any) => {
        this.rooms = rooms;
      });
      console.log('The dialog was closed');
      console.log(room);
    });
  }

  deleteRoom(roomName, roomId): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '500px',
      data: {action: 'deleteRoom', text: roomName, id: roomId}
    });
    dialogRef.afterClosed().subscribe(room => {
      this.roomService.getRooms().subscribe((rooms: any) => {
        this.rooms = rooms;
      });
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

}
