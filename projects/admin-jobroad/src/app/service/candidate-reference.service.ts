import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { CandidateReferencesResDto } from "../dto/candidate-references/candidate-references.res.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { CandidateReferencesInsertReqDto } from "../dto/candidate-references/candidate-references-insert.req.dto";
import { CandidateReferencesUpdateReqDto } from "../dto/candidate-references/candidate-references-update.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { DeleteResDto } from "../dto/delete.res.dto";

@Injectable({
    providedIn : 'root'
})
export class CandidateReferenceService{
    constructor(private base : BaseService){}
    getByCandidate(id : string) : Observable<CandidateReferencesResDto[]>{
        return this.base.getWithoutPipe<CandidateReferencesResDto[]>(`${BASE_URL}/candidate-references?id=${id}`);

    }

    create(data : CandidateReferencesInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/candidate-references`,data);
    }

    update(data : CandidateReferencesUpdateReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/candidate-references`,data);
    }

    delete(id : string) : Observable<DeleteResDto>{
        return this.base.delete<DeleteResDto>(`${BASE_URL}/candidate-references/${id}`,true);
    }
}
