import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {TokenStorageService} from '../service/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;

  constructor(private userService: UserService, private token: TokenStorageService) {
  }

  ngOnInit() {
    this.content = 'System for smart home data collecting';
  }
}
