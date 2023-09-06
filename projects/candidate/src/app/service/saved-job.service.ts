import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { InsertResDto } from "../dto/insert.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { DeleteResDto } from "projects/admin-jobroad/src/app/dto/delete.res.dto";
import { SavedJobInsertReqDto } from "../dto/saved-job/saved-job.insert.req.dto";
import { SavedJobResDto } from "../dto/saved-job/saved-job.res.dto";

@Injectable({
    providedIn: 'root'
})
export class SavedJobService {

    constructor(private base: BaseService) {

    }

    insert(data: SavedJobInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/saved-jobs`, data)
    }

    delete(jobId: string): Observable<DeleteResDto> {
        return this.base.delete<DeleteResDto>(`${BASE_URL}/saved-jobs/${jobId}`)
    }

    getByPrincipal(): Observable<SavedJobResDto[]> {
        return this.base.getWithoutPipe<SavedJobResDto[]>(`${BASE_URL}/saved-jobs`)
    }

}
