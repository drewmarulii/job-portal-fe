import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";


import { ApplicantInsertReqDto } from "../dto/applicant/applicant-insert.req.dto";
import { ApplicantResDto } from "../dto/applicant/applicant.res.dto";

import { UpdateResDto } from "../dto/update.res.dto";
import { ApplicantUpdateReqDto } from "../dto/applicant/applicant-update.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { JobResDto } from "projects/admin-jobroad/src/app/dto/job/job.res.dto";


@Injectable({
    providedIn: 'root'
})
export class ApplicantService {
    constructor(private base: BaseService) { }

    getByPrincipal(): Observable<ApplicantResDto[]> {
        return this.base.getWithoutPipe<ApplicantResDto[]>(`${BASE_URL}/applicants`)
    }

    create(applicantInsertDto: ApplicantInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/applicants`, applicantInsertDto);
    }


}
