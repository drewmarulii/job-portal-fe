import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { BenefitInsertReqDto } from "../dto/benefit/benefit-insert.req.dto";
import { BenefitResDto } from "../dto/benefit/benefit.res.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn : 'root'
})
export class BenefitService{
    constructor(private base : BaseService){}


    create(data : BenefitInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/benefits`,data);
    }

    getAll() : Observable<BenefitResDto[]>{
        return this.base.getWithoutPipe<BenefitResDto[]>(`${BASE_URL}/benefits`);
    }

    getByJob(id : string) : Observable<BenefitResDto[]>{
        return this.base.getWithoutPipe<BenefitResDto[]>(`${BASE_URL}/benefits/job?id=${id}`);
    }


}
