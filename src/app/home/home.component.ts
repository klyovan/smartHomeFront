import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../service/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;
  isLoggedIn = false;
  componentName: string;


  constructor(private tokenStorageService: TokenStorageService) {
    this.componentName =  window.location.pathname.toString();

  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.content = 'System for smart home data collecting';
  }
}
