import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { CompanyResDto } from "../dto/company/company.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { CompanyInsertReqDto } from "../dto/company/company-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { UpdateResDto } from "../dto/update.res.dto";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private base: BaseService) { }


  getAll(): Observable<CompanyResDto[]> {
    return this.base.getWithoutPipe<CompanyResDto[]>(`${BASE_URL}/companies`);
  }

  getDetail(id:string): Observable<CompanyResDto> {
    return this.base.getWithoutPipe<CompanyResDto>(`${BASE_URL}/companies/detail?id=${id}`);
  }
  create(data: CompanyInsertReqDto): Observable<InsertResDto> {
    return this.base.post<InsertResDto>(`${BASE_URL}/companies`, data);
  }
  update(data: CompanyInsertReqDto): Observable<UpdateResDto> {
    return this.base.patch<UpdateResDto>(`${BASE_URL}/companies`, data);
  }
}
