import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { EmployeeResDto } from "../dto/employee/employee.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { EmployeeInsertReqDto } from "../dto/employee/employee-insert.req.dto";
import { EmployeeInsertReqAdminDto } from "../dto/employee/employee-insert-admin.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn : 'root'
})
export class EmployeeService{
    constructor(private base : BaseService){}

    getAll() : Observable<EmployeeResDto[]>{
        return this.base.getWithoutPipe<EmployeeResDto[]>(`${BASE_URL}/employees`)
    }

    createFromAdmin(data : EmployeeInsertReqAdminDto) : Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/employees`, data);
    }

    getById(id : string) : Observable<EmployeeResDto> {
        return this.base.getWithoutPipe<EmployeeResDto>(`${BASE_URL}/employees/id?id=${id}`)
    }
}
