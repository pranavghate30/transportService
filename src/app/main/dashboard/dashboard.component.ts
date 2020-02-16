import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  headers: any = ['Employee Id', 'Seats', 'Time', 'Pickup', 'action'];
  loggedUser: any = {};
  allRides: any = [];
  myRides: any = [];
  action: string = '';

  constructor(private activeRoute: ActivatedRoute,
              private route: Router) {
  }

  deleteRide(rideDet) {
    let index = this.allRides.findIndex(ride => (ride.id === rideDet.id && ride.time === rideDet.time && ride.vehicleType === rideDet.vehicleType));
    if (index !== -1) {
      this.allRides.splice(index, 1);
      localStorage.removeItem('RideDetails');
      localStorage.setItem('RideDetails', JSON.stringify(this.allRides));
    }
    this.refreshMyRides();
  }

  ngOnInit() {
    if (sessionStorage.getItem('loggedInUser')) {
      this.loggedUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    }
    this.activeRoute.queryParams.subscribe(params => {
      if (params.hasOwnProperty('action')) {
        this.action = params.action;
      } else {
        this.action = '';
      }
    });

    if (!localStorage.getItem('empData')) {
      this.route.navigate(['/login']);
    }
    this.refreshMyRides();
  }

  refreshMyRides() {
    if (localStorage.getItem('RideDetails')) {
      this.allRides = JSON.parse(localStorage.getItem('RideDetails'));
      this.myRides = this.allRides.filter(ride => ride.id == this.loggedUser.id);
    }
  }

}
