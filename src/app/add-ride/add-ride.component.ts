import { Component, OnInit } from '@angular/core';
import { TransportServiceService } from 'src/services/transport-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
export interface rideDetails {
  id: string,
  employee_name: string,
  vehicleType: string,
  vehicleNo: string,
  vecantSeats: number,
  time: any,
  pickUpPoint: string,
  destination: string,
  state: string;
}
@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.scss']
})

export class AddRideComponent implements OnInit {
  availableRides: rideDetails[] = [];
  types: any = ['Bike', 'Car'];
  seats: any = [];
  rideForm: FormGroup;
  loggedUser: any = {};
  constructor() { }

  ngOnInit() {
    this.rideForm = new FormGroup({
      vehicleType: new FormControl('', [Validators.required]),
      vehicleNo: new FormControl('', [Validators.required]),
      vecantSeats: new FormControl(0, [Validators.required]),
      time: new FormControl(0, [Validators.required]),
      hour: new FormControl(1, [Validators.required]),
      min: new FormControl(1, [Validators.required]),
      pickUpPoint: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required])
    });
  }

  changeSeats() {
    if (this.rideForm.get('vehicleType').value == 'Bike') {
      this.seats = [1];
    } else {
      this.seats = [1, 2, 3, 4, 5, 6];
    }
  }

  addRide() {
    if (localStorage.getItem('loggedInUser')) {
      this.loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      console.log(this.loggedUser);
    }
    let rideDet: rideDetails = {
      id: this.loggedUser.id,
      employee_name: this.loggedUser.employee_name,
      vehicleType: this.rideForm.get('vehicleType').value,
      vehicleNo: this.rideForm.get('vehicleNo').value,
      vecantSeats: this.rideForm.get('vecantSeats').value,
      time: this.rideForm.get('hour').value + '.' + this.rideForm.get('min').value,
      pickUpPoint: this.rideForm.get('pickUpPoint').value,
      destination: this.rideForm.get('destination').value,
      state: ''
    }
    let index = this.availableRides.findIndex(ride => (ride.id === rideDet.id && ride.time === rideDet.time && ride.vehicleType === rideDet.vehicleType));
    if (index !== -1) {
      alert('Ride already exist');
      return;
    } else {
      if (localStorage.getItem('RideDetails')) {
        this.availableRides = JSON.parse(localStorage.getItem('RideDetails'));
      }
      this.availableRides.push(rideDet)
      localStorage.setItem('RideDetails', JSON.stringify(this.availableRides));
      this.ngOnInit();
      alert('Shared your ride details');
    }
  }
}
