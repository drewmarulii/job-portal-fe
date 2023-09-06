import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { CandidateEducationResDto } from "../dto/candidate-education/candidate-education.res.dto";
import { CandidateEducationInsertReqDto } from "../dto/candidate-education/candidate-education-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { CandidateEducationUpdateReqDto } from "../dto/candidate-education/candidate-education-update.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { DeleteResDto } from "../dto/delete.res.dto";

@Injectable({
    providedIn : 'root'
})
export class CandidateEducationService{
    constructor(private base : BaseService){}
    getByCandidate(id : string) : Observable<CandidateEducationResDto[]>{
        return this.base.getWithoutPipe<CandidateEducationResDto[]>(`${BASE_URL}/candidate-educations?id=${id}`);

    }

    create(data : CandidateEducationInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/candidate-educations`,data);
    }

    update(data : CandidateEducationUpdateReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/candidate-educations`,data);
    }

    delete(id : string) : Observable<DeleteResDto>{
        return this.base.delete<DeleteResDto>(`${BASE_URL}/candidate-educations/${id}`,true);
    }
}
