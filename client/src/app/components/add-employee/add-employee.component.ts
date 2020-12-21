import { Component, OnInit, Output } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  name: String = ""
  age:Number = 0
  gender:String="Male"
  isActive:String = '1'

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  submitEmployee(form){
    if(form.value.isActive === '1'){
      form.value.isActive = true
    }else{
      form.value.isActive = false
    }
    console.log(form.value)
    
    this._employeeService.addEmployee(form.value).subscribe((employee) => {
      if(employee.error) alert(employee.error)
      else if(employee.payload) alert("Employee details added successfully") 
    })
    form.reset()
  }

}
