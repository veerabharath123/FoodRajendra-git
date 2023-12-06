export class Employee {
    emp_id!:number;
    emp_name!:string;
    emp_phone!:string;
    emp_email!:string;
    emp_salary!:string;
    emp_gender!:number;
    emp_dept!:number;
    emp_state!:number;
    emp_city!:number;

}

export class EmployeeExt extends Employee {
    state_name!:string;
    city_name!:string;
    dept_name!:string;
    gender_name!:string;
}