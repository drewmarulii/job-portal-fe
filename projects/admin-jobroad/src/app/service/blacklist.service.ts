import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { BlacklistInsertReqDto } from "../dto/blacklist/blacklist-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "../dto/insert.res.dto";
import { BASE_URL } from "../constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class BlacklistService {

    constructor(private base: BaseService) {

    }

    create(data: BlacklistInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/blacklists`, data)
    }

}