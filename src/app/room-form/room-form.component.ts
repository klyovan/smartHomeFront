import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MyErrorStateMatcher} from '../login/login.component';
import {FormControl, Validators} from '@angular/forms';
import {DialogData} from '../room/room.component';
import {Room} from '../core/model/room.model';
import {RoomService} from '../service/room.service';
import {AuthService} from '../service/auth.service';
import {TokenStorageService} from '../service/token-storage.service';
import {log} from 'util';
import {User} from '../core/model/user.model';


@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit {
  matcher = new MyErrorStateMatcher;
  form: any = {};
  room: Room = new Room();
  nameControl = new FormControl('', Validators.required);
  user: User;

  constructor(public dialogRef: MatDialogRef<RoomFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private roomService: RoomService, private userService: TokenStorageService) {
  }

  ngOnInit() {
  }

  createRoom() {
    if (this.nameControl.valid === true) {
      this.user = this.userService.getUser();
      this.room.user = new User();
      this.room.user.id = this.user.id;
      if (this.room.link == null) {
        this.room.link = 'https://image.flaticon.com/icons/svg/2933/2933465.svg';
      }
      this.roomService.createRoom(this.room).subscribe(id => {
        this.dialogRef.close(id);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
