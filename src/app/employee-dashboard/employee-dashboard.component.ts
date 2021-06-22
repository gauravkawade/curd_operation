import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue ! : FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd ! : boolean;
  showUpdate! : boolean;
  constructor(private  formbuilder : FormBuilder,
  private api : ApiService){ }

  ngOnInit(): void {
   // this.formValue = this.formbuilder.group({
     this.formValue =new FormGroup({
      firstName:new FormControl('',[Validators.required, Validators.minLength(1),Validators.maxLength(50)]),
      //firstName : ['',[Validators.required, Validators.minLength(3)]],
      lastName : new FormControl('',[Validators.required, Validators.minLength(1),Validators.maxLength(50)]),
      address : new FormControl('',[Validators.required, Validators.minLength(1),Validators.maxLength(250)]),
      email :new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      mobile :new FormControl('',[Validators.required,Validators.minLength(10),
        Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-, (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
      username :new FormControl('',[Validators.required, Validators.minLength(1),Validators.maxLength(50)]),
      designation :new FormControl('',[Validators.required, Validators.minLength(1),Validators.maxLength(50)]),
    })
    this.getAllEmployee();
  }
  get f(){
    return this.formValue.controls;
  }
  submit() {
    
    console.warn(this.formValue.value);
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.address = this.formValue.value.address;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.username = this.formValue.value.username;
    this.employeeModelObj.designation = this.formValue.value.designation;
     
    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something Went wrong");
    })

  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }
  deletEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }
  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['username'].setValue(row.username);
    this.formValue.controls['designation'].setValue(row.designation);
  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.address = this.formValue.value.address;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.username = this.formValue.value.username;
    this.employeeModelObj.designation = this.formValue.value.designation;


    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

}
