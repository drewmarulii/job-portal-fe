import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { CompanyResDto } from "../dto/company/company.res.dto";
import { BASE_URL } from "../constant/api.constant";


@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    constructor(private base: BaseService) { }


    getAll(): Observable<CompanyResDto[]> {
        return this.base.getWithoutPipe<CompanyResDto[]>(`${BASE_URL}/companies`);

    }

    getDetail(id: string): Observable<CompanyResDto> {
        return this.base.getWithoutPipe<CompanyResDto>(`${BASE_URL}/companies/detail?id=${id}`)
    }


}
