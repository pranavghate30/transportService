import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransportServiceService {

  constructor(public http : HttpClient) { }

  getEmployees(){
    let URL = 'http://dummy.restapiexample.com/api/v1/employees';
    return this.http.get(URL);
  }
}
