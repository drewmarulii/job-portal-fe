import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { CandidateLanguageResDto } from "../dto/candidate-language/candidate-language.res.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { DeleteResDto } from "../dto/delete.res.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { CandidateLanguageInsertReqDto } from "../dto/candidate-language/candidate-language-insert.req.dto";
import { CandidateLanguageUpdateReqDto } from "../dto/candidate-language/candidate-language-update.req.dto";

@Injectable({
    providedIn: 'root'
})
export class CandidateLanguageService {
    constructor(private base: BaseService) { }
    getByCandidate(id: string): Observable<CandidateLanguageResDto[]> {
        return this.base.getWithoutPipe<CandidateLanguageResDto[]>(`${BASE_URL}/candidate-language?id=${id}`);

    }

    create(data: CandidateLanguageInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/candidate-language`, data);
    }

    update(data: CandidateLanguageUpdateReqDto): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>(`${BASE_URL}/candidate-language`, data);
    }

    delete(id: string): Observable<DeleteResDto> {
        return this.base.delete<DeleteResDto>(`${BASE_URL}/candidate-language/${id}`, true);
    }
}
