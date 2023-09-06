import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/api.constant";
import { UpdateResDto } from "../dto/update.res.dto";
import { DeleteResDto } from "../dto/delete.res.dto";
import { CandidateFamilyResDto } from "../dto/candidate-family/candidate-family.res.dto";
import { CandidateFamilyInsertReqDto } from "../dto/candidate-family/candidate-family-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { CandidateFamilyUpdateReqDto } from "../dto/candidate-family/candidate-family-update.req.dto";

@Injectable({
    providedIn: 'root'
})
export class CandidateFamilyService {
    constructor(private base: BaseService) { }
    getByCandidate(id: string): Observable<CandidateFamilyResDto[]> {
        return this.base.getWithoutPipe<CandidateFamilyResDto[]>(`${BASE_URL}/candidate-family?id=${id}`);

    }

    create(data: CandidateFamilyInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/candidate-family`, data);
    }

    update(data: CandidateFamilyUpdateReqDto): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>(`${BASE_URL}/candidate-family`, data);
    }

    delete(id: string): Observable<DeleteResDto> {
        return this.base.delete<DeleteResDto>(`${BASE_URL}/candidate-family/${id}`, true);
    }
}
