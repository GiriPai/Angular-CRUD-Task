import { Component, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees:Employee[];
  constructor(private _employeeService: EmployeeService) {   }

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees(){
    this._employeeService.getEmployees().subscribe((employees) => {
      if(employees.error){
        alert(employees.error)
      }else{
        this.employees = employees.payload
      }
    })
  }

  handleDelete(id){
    if(window.confirm("Are you sure?"))
      this._employeeService.removeEmployees(id).subscribe((res) => {
        alert(`Employee ${res.payload.name} has been removed successfully`)
      })
      this.getEmployees()
  }

}
