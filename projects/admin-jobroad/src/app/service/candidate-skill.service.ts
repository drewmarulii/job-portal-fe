import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { CandidateSkillResDto } from "../dto/candidate-skill/candidate-skill.res.dto";
import { CandidateSkillInsertReqDto } from "../dto/candidate-skill/candidate-skill-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { CandidateSkillUpdateReqDto } from "../dto/candidate-skill/candidate-skill-update.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { DeleteResDto } from "../dto/delete.res.dto";

@Injectable({
    providedIn : 'root'
})
export class CandidateSkillService{
    constructor(private base : BaseService){}
    getByCandidate(id : string) : Observable<CandidateSkillResDto[]>{
        return this.base.getWithoutPipe<CandidateSkillResDto[]>(`${BASE_URL}/candidate-skills?id=${id}`);

    }

    create(data : CandidateSkillInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/candidate-skills`,data);
    }

    update(data : CandidateSkillUpdateReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/candidate-skills`,data);
    }

    delete(id : string) : Observable<DeleteResDto>{
        return this.base.delete<DeleteResDto>(`${BASE_URL}/candidate-skills/${id}`,true);
    }
}
