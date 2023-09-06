import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { JobResDto } from "../dto/job/job.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { JobInsertReqDto } from "../dto/job/job-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { JobUpdateReqDto } from "../dto/job/job-update.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";

@Injectable({
    providedIn: 'root'
})
export class JobService {
    constructor(private base: BaseService) { }

    getAll(): Observable<JobResDto[]> {
        return this.base.getWithoutPipe<JobResDto[]>(`${BASE_URL}/jobs`);
    }

    create(data: JobInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/jobs`, data);
    }

    getByPrincipal(): Observable<JobResDto[]> {
        return this.base.getWithoutPipe<JobResDto[]>(`${BASE_URL}/jobs/person`);
    }

    getByPic(): Observable<JobResDto[]> {
        return this.base.getWithoutPipe<JobResDto[]>(`${BASE_URL}/jobs/pic`);
    }

    getByCompany(code: string): Observable<JobResDto[]> {
        return this.base.get<JobResDto[]>(`${BASE_URL}/jobs/company`);
    }
    getByDetail(id: string): Observable<JobResDto> {
        return this.base.get<JobResDto>(`${BASE_URL}/jobs/detail?id=${id}`);
    }
    update(data : JobUpdateReqDto) : Observable <UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/jobs`,data);
    }
}
