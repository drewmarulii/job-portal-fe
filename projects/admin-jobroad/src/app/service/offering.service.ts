import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { OfferingLetterInsertReqDto } from "../dto/offering-letter/offering-letter-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "../dto/insert.res.dto";
import { BASE_URL } from "../constant/api.constant";

@Injectable({
    providedIn : 'root'
})
export class OfferingService{
    constructor(private base : BaseService){}

    create(data : OfferingLetterInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/offerings`,data);
    }
}