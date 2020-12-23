import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  id:Number = Number(this.route.snapshot.paramMap.get('id'))
  constructor(private _employeeService: EmployeeService, private route:ActivatedRoute, private router: Router) { }

  employee : Employee = {
    id : null,
    name:null,
    age:null,
    gender:null,
    isActive:null
  }
  user={
    id:0,
    name: "",
    age:0,
    gender:"",
    isActive:''
  }

  ngOnInit(): void {
      this._employeeService.getEmployee(this.id).subscribe((employee) => {
          const formData = employee.payload
          console.log(formData)
          this.user = {
            id: formData.id,
            name:formData.name,
            age:formData.age,
            gender:formData.gender,
            isActive: formData.isActive ? '1' : '0'
          }
      })
  }

  submitEmployee(employee){
    employee.value.isActive = employee.value.isActive === '1' ? true : false
    this._employeeService.updateEmployee(this.id, employee.value).subscribe((res) => {
      alert(`Employee with id ${res.payload.id} has been modified`)
    })
    this.router.navigate(['/'])

  }
}
