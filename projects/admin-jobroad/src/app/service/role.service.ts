import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { RoleResDto } from "../dto/role/role.res.dto";
import { BASE_URL } from "../constant/api.constant";

@Injectable({
    providedIn : 'root'
})
export class RoleService{
    constructor(private base : BaseService){}
    getAll() : Observable<RoleResDto[]>{
        return this.base.getWithoutPipe<RoleResDto[]>(`${BASE_URL}/roles`);
    }
}
