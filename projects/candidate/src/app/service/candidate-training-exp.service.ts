import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { CandidateTrainingResDto } from "../dto/candidate-training/candidate-training.res.dto";
import { CandidateTrainingInsertReqDto } from "../dto/candidate-training/candidate-training-insert.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { CandidateTrainingUpdateReqDto } from "../dto/candidate-training/candidate-training-update.req.dto";
import { DeleteResDto } from "../dto/delete.res.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class CandidateTrainingExpService {
    constructor(private base: BaseService) { }
    getByCandidate(id: string): Observable<CandidateTrainingResDto[]> {
        return this.base.getWithoutPipe<CandidateTrainingResDto[]>(`${BASE_URL}/training-experiences?id=${id}`);

    }

    create(data: CandidateTrainingInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/training-experiences`, data);
    }

    update(data: CandidateTrainingUpdateReqDto): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>(`${BASE_URL}/training-experiences`, data);
    }

    delete(id: string): Observable<DeleteResDto> {
        return this.base.delete<DeleteResDto>(`${BASE_URL}/training-experiences/${id}`, true);
    }
}
