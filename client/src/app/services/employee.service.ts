import { Injectable } from '@angular/core';
// import { type } from 'os';

import {HttpClient, HttpHeaders} from '@angular/common/http'

import { Employee } from '../models/Employee';
import { Observable,throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeesUrl :string =  'http://localhost:5000/employees'

  constructor(private http: HttpClient) { }

  employees : Employee[] = [
    {
      id:1,
      name:"giri",
      age:22,
      gender:"Male",
      isActive: true
    },
    {
      id:2,
      name:"hari",
      age:12,
      gender:"Male",
      isActive: false
    },
    {
      id:3,
      name:"Anu",
      age:28,
      gender:"Female",
      isActive: true
    },
   
  ]

  getEmployees():Observable<any>{
    return this.http.get<any>(this.employeesUrl)
  }

  getEmployee(id): Observable<any>{
      return this.http.get<any>(`${this.employeesUrl}/${id}`)
  }

  addEmployee(empdata):Observable<any>{
    // empdata.id = this.employees.length + 1
    // this.employees.push(empdata)
    return this.http.post<any>(this.employeesUrl, empdata);
  }

  updateEmployee(id, empdata):Observable<any>{
    // let index = this.employees.findIndex(emp => emp.id === id)
    // empdata.id = id
    // this.employees.splice(index,1,empdata)
    return this.http.put<any>(`${this.employeesUrl}/${id}`, empdata)
  }

  removeEmployees(id):Observable<any>{
    // return this.employees = this.employees.filter((emp) => emp.id != id)

    return this.http.delete<any>(`${this.employeesUrl}/${id}`)
  }
}
