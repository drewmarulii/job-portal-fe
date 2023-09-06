import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { McusInsertReqDto } from "../dto/mcu/mcus-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "../dto/insert.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { McuResDto } from "../dto/mcu/mcu.res.dto";

@Injectable({
    providedIn : 'root'
})
export class McuService{
    constructor(private base : BaseService){}

    create(data : McusInsertReqDto) : Observable <InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/mcus`,data);
    }

    getByApplicant(id : string) : Observable<McuResDto[]>{
        return this.base.getWithoutPipe<McuResDto[]>(`${BASE_URL}/mcus?applicantId=${id}`);
    }
}
