import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HiredInsertReqDto } from "../dto/hired/hired-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "../dto/insert.res.dto";
import { BASE_URL } from "../constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class HiredService {

    constructor(private base: BaseService) { }

    create(data: HiredInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/hired`, data);
    }
}