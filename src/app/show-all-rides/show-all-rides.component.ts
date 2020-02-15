import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-show-all-rides',
  templateUrl: './show-all-rides.component.html',
  styleUrls: ['./show-all-rides.component.scss']
})
export class ShowAllRidesComponent implements OnInit {
  allRides: any = [];
  hours: any = 1;
  min: any = 1;
  types: any = ['All', 'Bike', 'Car'];
  displayedColumns: string[] = ['id', 'employee_name', 'vehicleType', 'vehicleNo', 'vecantSeats', 'time', 'pickUpPoint', 'destination', 'action'];
  dataSource: any;
  loggedInUser: any;

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('loggedInUser')) {
      this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    }
    if (localStorage.getItem('RideDetails')) {
      this.allRides = JSON.parse(localStorage.getItem('RideDetails'));
      this.dataSource = new MatTableDataSource<any>(this.allRides);
    }
  }

  filterData(event) {
    if (event.value === 'All') {
      this.dataSource.filter = '';
    } else {
      const filterValue = event.value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  checkTime(time) {
    let currentHour = new Date().getHours();
    let currentMin = new Date().getMinutes();
    let curTime = Number(currentHour + '.' + currentMin);
    let rideTime = Number(time);
    if (rideTime > curTime) {
      if ((rideTime - curTime) > 2) {
        return true;
      } else {
        return false;
      }
    } else {
      if ((curTime - rideTime) > 2) {
        return true;
      } else {
        return false;
      }
    }
  }

  bookRide(ride) {
    this.loggedInUser.ongoingRide = ride;
    ride.state = 'booked';
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
  }

  cancelRide(ride) {
    this.loggedInUser.ongoingRide = {};
    ride.state = '';
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
  }

}
