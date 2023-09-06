import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { JobResDto } from "../dto/job/job.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { JobInsertReqDto } from "../dto/job/job-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class JobService {

    fromComponent: string | null = null

    constructor(private base: BaseService) { }

    getAll(): Observable<JobResDto[]> {
        return this.base.getWithoutPipe<JobResDto[]>(`${BASE_URL}/jobs`);
    }
    getByPrincipal(): Observable<JobResDto[]> {
        return this.base.getWithoutPipe<JobResDto[]>(`${BASE_URL}/jobs/person`);
    }

    getByCompany(code: string): Observable<JobResDto[]> {
        return this.base.get<JobResDto[]>(`${BASE_URL}/jobs/company?code=${code}`);
    }

    getDetail(jobId: string): Observable<JobResDto> {
        return this.base.getWithoutPipe<JobResDto>(`${BASE_URL}/jobs/detail?jobId=${jobId}`)
    }

    filter(title: string, location: string, salary: number): Observable<JobResDto[]> {
        let url = `${BASE_URL}/jobs/filter?`
        if (title != null) {
            url += `title=${title}`
        }
        if (location != null) {
            if (title != null) {
                url += `&location=${location}`
            } else {
                url += `location=${location}`
            }
        }
        if (salary != null) {
            if (salary != null || title != null) {
                url += `&salary=${salary}`
            } else {
                url += `salary=${salary}`
            }
        }
        return this.base.get<JobResDto[]>(url);
    }

    getTopSalary(): Observable<JobResDto[]> {
        return this.base.get<JobResDto[]>(`${BASE_URL}/jobs/topsalary`)

    }
}
