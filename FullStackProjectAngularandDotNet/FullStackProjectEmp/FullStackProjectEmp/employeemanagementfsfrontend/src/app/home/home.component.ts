import { Component, OnInit } from '@angular/core';
import { EmployeeExt } from '../models/employee-model';
import { DataApiService } from '../services/dataapi.service';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  employees: EmployeeExt[] = [];
  selectedEmp: EmployeeExt | null = null;
  clickedView:boolean=false;
  constructor(private dataapi: DataApiService, private router: Router,private storage:StorageService) {}
  ngOnInit(): void {
    console.log('Home Component');
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.dataapi.getAllEmployees().subscribe((result: EmployeeExt[]) => {
      this.employees = result;
    });
  }

  deleteEmployee() {
    if(this.selectedEmp){
      this.dataapi.deleteEmployee(this.selectedEmp?.emp_id).subscribe((result: boolean) => {
        if (result) {
          this.employees = this.employees.filter((x) => x.emp_id !== this.selectedEmp?.emp_id);
          this.selectedEmp=null;
          // this.router.navigate(['/home']);
        }
      });
    }
    
   
  }

  getEmployeeDetailsById(id: number) {
    this.dataapi.getEmployeeById(id).subscribe((result: EmployeeExt) => {
      this.selectedEmp = result;
    });
  }

  onView(id:number){
    this.storage.set('empbyid',JSON.stringify({id:id,isView:true}));
    this.router.navigate(['/signup']);
  }

  onAddEmployee(){
    this.storage.set('empbyid',"");
    this.router.navigate(['/signup']);
  }
  onEdit(id:number){
    this.storage.set('empbyid',JSON.stringify({id:id,isView:false}));
    this.router.navigate(['/signup']);
  }
}
