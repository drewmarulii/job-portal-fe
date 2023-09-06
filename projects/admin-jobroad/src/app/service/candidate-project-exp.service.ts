import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { CandidateProjectResDto } from "../dto/candidate-project/candidate-project.res.dto";
import { CandidateProjectInsertReqDto } from "../dto/candidate-project/candidate-project-insert.req.dto";
import { CandidateProjectUpdateReqDto } from "../dto/candidate-project/candidate-project-update.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { DeleteResDto } from "../dto/delete.res.dto";

@Injectable({
    providedIn : 'root'
})
export class CandidateProjectExpService{
    constructor(private base : BaseService){}
    getByCandidate(id : string) : Observable<CandidateProjectResDto[]>{
        return this.base.getWithoutPipe<CandidateProjectResDto[]>(`${BASE_URL}/candidate-projects?id=${id}`);

    }

    create(data : CandidateProjectInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/candidate-projects`,data);
    }

    update(data : CandidateProjectUpdateReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/candidate-projects`,data);
    }

    delete(id : string) : Observable<DeleteResDto>{
        return this.base.delete<DeleteResDto>(`${BASE_URL}/candidate-projects/${id}`,true);
    }
}
