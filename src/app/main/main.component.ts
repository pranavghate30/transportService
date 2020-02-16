import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  loggedUser: any = {};

  constructor() {
  }

  logout() {
    sessionStorage.removeItem('loggedInUser');
  }

  ngOnInit() {
    if (sessionStorage.getItem('loggedInUser')) {
      this.loggedUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    }
  }

}
