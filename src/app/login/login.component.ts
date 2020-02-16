import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {finalize} from "rxjs/internal/operators";
import {TransportServiceService} from "../../services/transport-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  empId = new FormControl('', [Validators.required]);
  noEmployeeFound: boolean = false;
  empData: any = [];

  constructor(private router: Router,
              private transportService: TransportServiceService) {
  }

  feetchEmployeeData() {
    this.transportService.getEmployees()
      .pipe(finalize(() => {
        localStorage.setItem('empData', JSON.stringify(this.empData));
      }))
      .subscribe((response: any) => {
        this.empData = response.data;
        this.empData.forEach(emp => {
          emp.vehicleType = '';
          emp.vehicleNo = '';
          emp.state = '';
          emp.vecantSeats = '';
          emp.bookedRide = [];
          emp.givenRides = [];
          emp.ongoingRide = {};
          emp.time = '';
          emp.bookedRides = '';
          emp.selectedRide = '';
          emp.pickUpPoint = '';
          emp.destination = '';
        });
      });
  }

  ngOnInit() {
    this.empId.patchValue('');
    this.empId.updateValueAndValidity();
    this.feetchEmployeeData();
  }

  login(type) {
    if (this.empData.length > 0) {
      let index = this.empData.findIndex(emp => emp.id === this.empId.value.toString());
      if (index !== -1) {
        this.noEmployeeFound = false;
        this.empData[index].type = type;
        this.router.navigate(['main/dashboard']);
      } else {
        this.noEmployeeFound = true;
      }
      sessionStorage.setItem('loggedInUser', JSON.stringify(this.empData[index]));
    } else {
      this.noEmployeeFound = true;
    }

  }

}
