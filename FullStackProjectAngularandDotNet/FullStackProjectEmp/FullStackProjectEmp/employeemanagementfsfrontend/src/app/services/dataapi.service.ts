import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmployeeExt } from '../models/employee-model';
import { Gender } from '../models/gender-model';
import { Department } from '../models/department-model';
import { State } from '../models/state-model';
import { City } from '../models/city-model';
import { KeyValue } from '../models/keyvalue-model';

@Injectable({
  providedIn: 'root',
})
export class DataApiService {
  constructor(private http: HttpClient) {}
  apiUrl: string = 'https://localhost:7135/api/EmployeeFSApi/';

  getAllEmployees(): Observable<EmployeeExt[]> {
    return this.http.post<EmployeeExt[]>(this.apiUrl + 'GetAllEmployees', '');
  }
  getEmployeeById(id: number): Observable<EmployeeExt> {
    var kv = new KeyValue();
    kv.value1 = id;
    return this.http.post<EmployeeExt>(this.apiUrl + 'GetEmployeeById', kv);
  }
  getAllGenders(): Observable<Gender[]> {
    return this.http.post<Gender[]>(this.apiUrl + 'GetAllGenders', '');
  }
  getAllDeparments(): Observable<Department[]> {
    return this.http.post<Department[]>(this.apiUrl + 'GetAllDepartments', '');
  }
  getAllStates(): Observable<State[]> {
    return this.http.post<State[]>(this.apiUrl + 'GetAllStates', '');
  }
  getCitiesByStateId(id: number): Observable<City[]> {
    var kv = new KeyValue();
    kv.value1 = id;
    return this.http.post<City[]>(this.apiUrl + 'GetAllCitiesByStateId', kv);
  }
  deleteEmployee(id: number): Observable<boolean> {
    var kv = new KeyValue();
    kv.value1 = id;
    return this.http.post<boolean>(this.apiUrl + 'DeleteEmployee', kv);
  }
  saveEmployee(record: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl + 'SaveEmployee', record);
  }
  updateEmployee(record: Employee):Observable<number> {
    return this.http.post<number>(this.apiUrl + 'UpdateEmployee', record);
  }
}
