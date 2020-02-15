import { Component, OnInit } from '@angular/core';
import { TransportServiceService } from 'src/services/transport-service.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'infrrdTransport';
  empData: any = [];
  employeeFound: boolean = false;
  type: string = '';
  empId = new FormControl('', [Validators.required]);
  constructor(
    public transportService: TransportServiceService
  ) { }

  logout() {
    this.type = '';
    this.employeeFound = false
    localStorage.removeItem('loggedInUser');
  }

  login(type) {
    this.type = type;
    if (this.empData.length > 0) {
      let index = this.empData.findIndex(emp => emp.id === this.empId.value.toString());
      if (index !== -1) {
        this.empData[index].type = type;
        this.employeeFound = true;
      } else {
        this.employeeFound = false;
      }
      localStorage.setItem('loggedInUser', JSON.stringify(this.empData[index]));
    } else {
      this.employeeFound = false;
    }

  }

  ngOnInit() {
    localStorage.clear();
    this.empId.patchValue('');
    this.empId.updateValueAndValidity();
    this.transportService.getEmployees()
      .subscribe((response: any) => {
        this.empData = response.data;
        console.log(this.empData);
        this.empData.forEach(emp => {
          emp.vehicleType = '';
          emp.vehicleNo = '';
          emp.state = '';
          emp.vecantSeats = '';
          emp.bookedRide = [];
          emp.ongoingRide = {};
          emp.time = '';
          emp.bookedRides = '';
          emp.selectedRide = '';
          emp.pickUpPoint = '';
          emp.destination = '';
        });
      })
  }
}
