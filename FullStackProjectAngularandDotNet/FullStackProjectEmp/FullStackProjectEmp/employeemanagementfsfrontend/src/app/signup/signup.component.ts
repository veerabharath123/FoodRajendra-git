import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../services/dataapi.service';
import { Gender } from '../models/gender-model';
import { Department } from '../models/department-model';
import { State } from '../models/state-model';
import { City } from '../models/city-model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Employee, EmployeeExt } from '../models/employee-model';
import { Router } from '@angular/router';
import { CREATE, VIEW, UPDATE, DELETE } from '../shared/constants-shared';
import { StorageService } from '../services/storage service/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  genders: Gender[] = [];
  departments: Department[] = [];
  states: State[] = [];
  cities: City[] = [];
  enableCity: boolean = false;
  empFormGroup: FormGroup = new FormGroup({});
  mode!: string | null;
  isEdit:boolean=true;
  title:string='Register';

  readonly CREATE: string = CREATE; // Constant for create mode
  readonly VIEW: string = VIEW; // Constant for view mode
  readonly UPDATE: string = UPDATE; // Constant for view mode
  readonly DELETE: string = DELETE; // Constant for view mode

  constructor(
    private dataapi: DataApiService,
    private builder: FormBuilder,
    private router: Router,
    private storage: StorageService
  ) {}
  ngOnInit(): void {
    console.log('Signup Component');
    this.getAllGenders();
    this.getAllDepartments();
    this.getAllStates();
    this.inItForm();
    this.onView();
  }

  inItForm() {
    this.empFormGroup = this.builder.group({
      emp_id:[0],
      emp_name: ['', [Validators.required]],
      emp_email: ['', [Validators.required, Validators.email]],
      emp_phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      emp_salary: ['', [Validators.required]],
      emp_gender: [0, [Validators.required]],
      emp_dept: [0, [Validators.required, this.invalidZero]],
      emp_state: [0, [Validators.required, this.invalidZero]],
      emp_city: [0],
    });
    this.empFormGroup.controls['emp_city'].disable();

  }
  getAllGenders() {
    this.dataapi.getAllGenders().subscribe((result: Gender[]) => {
      this.genders = result;
    });
  }
  getAllDepartments() {
    this.dataapi.getAllDeparments().subscribe((result: Department[]) => {
      this.departments = result;
    });
  }
  getAllStates() {
    this.dataapi.getAllStates().subscribe((result: State[]) => {
      this.states = result;
    });
  }
  getCitiesByStateId(event: any) {
    var state_id = parseInt(
      (event.target.value ?? '') == '' ? '0' : event.target.value
    );
    this.getCitiesBySelectedStateid(state_id);
  }
  getCitiesBySelectedStateid(state_id:number,isView:boolean=false){
    this.empFormGroup.controls['emp_city'].setValue(0);
    if (state_id > 0) {
      this.dataapi.getCitiesByStateId(state_id).subscribe((result: City[]) => {
        this.cities = result;
        if(!isView){
          this.empFormGroup.controls['emp_city'].enable();
        }
       
      });
    } else {
      this.cities = [];
      this.empFormGroup.controls['emp_city'].disable();
    }
  }
  submitSignup() {
    let emp = this.empFormGroup.value as Employee;
    if(emp.emp_id>0){
      this.dataapi.updateEmployee(emp).subscribe((result:number)=>{
        if(result>0){
          this.onBack();
        }
      });
    }else{
      this.dataapi.saveEmployee(emp).subscribe((result: Employee) => {
        if (result) {
          this.onBack();
        }
      });
    }
  }
  invalidZero(c: AbstractControl) {
    const f = c.value === 0 || c.value === '0';
    return f ? { invalidZero: true } : null;
  }

  onView() {
    
    let ch = this.storage.get('empbyid');
    if (ch) {
      let obj = JSON.parse(ch);
      this.dataapi.getEmployeeById(obj.id).subscribe((result: Employee) => {
        
        if (result) {
          
          this.getCitiesBySelectedStateid(result.emp_state,obj.isView);
          this.empFormGroup.patchValue(result);
          if(obj.isView){this.empFormGroup.disable();this.title='View'}else{this.title='Edit'}
          this.isEdit=!obj.isView;
        }

      });
    }
  }
  onBack(){
    this.router.navigate(['']);
  }
}
