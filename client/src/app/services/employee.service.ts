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
      name:"Arun",
      age:22,
      gender:"Male",
      isActive: true
    },
    {
      id:2,
      name:"Arjun",
      age:28,
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
    return this.http.post<any>(this.employeesUrl, empdata);
  }

  updateEmployee(id, empdata):Observable<any>{
    return this.http.put<any>(`${this.employeesUrl}/${id}`, empdata)
  }

  removeEmployees(id):Observable<any>{
    return this.http.delete<any>(`${this.employeesUrl}/${id}`)
  }
}
