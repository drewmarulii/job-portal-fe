import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { CandidateWorkResDto } from "../dto/candidate-work/candidate-work.res.dto";
import { CandidateWorkInsertReqDto } from "../dto/candidate-work/candidate-work-insert.req.dto";
import { CandidateWorkUpdateReqDto } from "../dto/candidate-work/candidate-work-update.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { DeleteResDto } from "../dto/delete.res.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class CandidateWorkExpService {
    constructor(private base: BaseService) { }
    getByCandidate(id: string): Observable<CandidateWorkResDto[]> {
        return this.base.getWithoutPipe<CandidateWorkResDto[]>(`${BASE_URL}/candidate-works?id=${id}`);

    }

    create(data: CandidateWorkInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/candidate-works`, data);
    }

    update(data: CandidateWorkUpdateReqDto): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>(`${BASE_URL}/candidate-works`, data);

    }

    delete(id: string): Observable<DeleteResDto> {
        return this.base.delete<DeleteResDto>(`${BASE_URL}/candidate-works/${id}`, true);
    }
}
