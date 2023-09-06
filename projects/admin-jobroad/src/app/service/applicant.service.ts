import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { ApplicantInsertReqDto } from "../dto/applicant/applicant-insert.req.dto";
import { ApplicantResDto } from "../dto/applicant/applicant.res.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { ApplicantUpdateReqDto } from "../dto/applicant/applicant-update.req.dto";

@Injectable({
    providedIn: 'root'
})
export class ApplicantService {
    constructor(private base: BaseService) { }
    getByJob(jobId: string): Observable<ApplicantResDto[]> {
        return this.base.getWithoutPipe<ApplicantResDto[]>(`${BASE_URL}/applicants?jobId=${jobId}`);
    }

    getById(id : string) : Observable<ApplicantResDto>{
        return this.base.getWithoutPipe<ApplicantResDto>(`${BASE_URL}/applicants/filter?id=${id}`);
    }

    create(data : ApplicantInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/applicants`,data);
    }

    update(data: ApplicantUpdateReqDto): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>(`${BASE_URL}/applicants`, data);
    }
}
