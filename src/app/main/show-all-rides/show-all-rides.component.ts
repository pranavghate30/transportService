import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-show-all-rides',
  templateUrl: './show-all-rides.component.html',
  styleUrls: ['./show-all-rides.component.scss']
})
export class ShowAllRidesComponent implements OnInit {
  headers: any = ['Vehicle Type', 'Seats Available', 'Time', 'Pickup', 'Destination', 'Action'];
  filterVal = new FormControl('');
  allRides: any = [];
  availableRides: any = [];
  availableRidesCopy: any = [];
  types: any = ['All', 'Bike', 'Car'];
  loggedUser: any;

  constructor() {
  }

  ngOnInit() {
    if (sessionStorage.getItem('loggedInUser')) {
      this.loggedUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    }
    if (localStorage.getItem('RideDetails')) {
      this.allRides = JSON.parse(localStorage.getItem('RideDetails'));
      this.availableRides = this.allRides.filter(ride => {
        if (ride.vecantSeats == 0 || this.checkTime(ride.time) || ride.id == this.loggedUser.id) {
          return;
        } else {
          return ride;
        }
      });
      this.availableRidesCopy = JSON.parse(JSON.stringify(this.availableRides));
    }
  }

  filterData() {
    if (this.filterVal.value !== '') {
      this.availableRides = this.availableRidesCopy.filter(ride => ride.vehicleType === this.filterVal.value);
    } else {
      this.availableRides = this.availableRidesCopy;
    }
  }

  checkTime(time) {
    let currentHour = new Date().getHours();
    let currentMin = new Date().getMinutes();
    let curTime = Number(currentHour + '.' + currentMin);
    let rideTime = Number(time);
    if (rideTime > curTime) {
      return ((rideTime - curTime) > 2)
    } else {
      return ((curTime - rideTime) > 2)
    }
  }

  bookRide(ride) {
    ride.state = 'booked';
    this.loggedUser.ongoingRide = ride;
    let index = this.allRides.findIndex((rides: any) => (rides.id == ride.id && rides.time == ride.time && rides.vehicleType == ride.vehicleType));
    if (index !== -1) {
      this.allRides[index].vecantSeats = this.allRides[index].vecantSeats - 1;
    }
    localStorage.removeItem('RideDetails');
    localStorage.setItem('RideDetails', JSON.stringify(this.allRides));
    sessionStorage.removeItem('loggedInUser');
    sessionStorage.setItem('loggedInUser', JSON.stringify(this.loggedUser));
  }

  cancelRide(ride) {
    ride.state = '';
    this.loggedUser.ongoingRide = {};
    let index = this.allRides.findIndex((rides: any) => (rides.id == ride.id && rides.time == ride.time && rides.vehicleType == ride.vehicleType));
    if (index !== -1) {
      this.allRides[index].vecantSeats = this.allRides[index].vecantSeats + 1;
    }
    sessionStorage.removeItem('loggedInUser');
    sessionStorage.setItem('loggedInUser', JSON.stringify(this.loggedUser));
  }
}
