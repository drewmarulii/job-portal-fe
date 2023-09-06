import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { CandidateUserInsertReqDto } from "../dto/candidate-user/candidate-user-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { CandidateMasterInsertReqDto } from "../dto/candidate/candidate-master-insert.req.dto";
import { CandidateUserResDto } from "../dto/candidate-user/candidate-user.res.dto";
import { CandidateUserUpdateReqDto } from "../dto/candidate-user/candidate-user-update.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";

@Injectable({
    providedIn: 'root'
})
export class CandidateUserService {
    constructor(private base: BaseService) { }


    create(data: CandidateUserInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/candidate-user`, data);
    }

    register(data: CandidateMasterInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/candidate-user/register`, data);
    }

    getAll(): Observable<CandidateUserResDto[]> {
        return this.base.getWithoutPipe<CandidateUserResDto[]>(`${BASE_URL}/candidate-user`);
    }

    getCandidateUserById(id: String): Observable<CandidateUserResDto> {
        return this.base.getWithoutPipe<CandidateUserResDto>(`${BASE_URL}/candidate-user/detail?id=${id}`)
    }

    update(data: CandidateUserUpdateReqDto): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>(`${BASE_URL}/candidate-user/update`, data)
    }

}
