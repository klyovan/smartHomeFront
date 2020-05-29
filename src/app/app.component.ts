import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './service/token-storage.service';
import {MqttService} from 'ngx-mqtt';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from './service/auth.service';

export const URL_BACK = 'https://housex.herokuapp.com/';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;



  constructor(private tokenStorageService: TokenStorageService, private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {
    // this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.authService.isAdmin = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
    }
  }


  logout() {
    this.authService.isLogged = false;
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
