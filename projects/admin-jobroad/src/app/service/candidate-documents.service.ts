import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { CandidateDocumentResDto } from "../dto/candidate-document/candidate-document.res.dto";
import { CandidateDocumentInsertReqDto } from "../dto/candidate-document/candidate-document-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { CandidateDocumentUpdateReqDto } from "../dto/candidate-document/candidate-document-update.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { DeleteResDto } from "../dto/delete.res.dto";

@Injectable({
    providedIn : 'root'
})
export class CandidateDocumentService{
    constructor(private base : BaseService){}
    getByCandidate(id : string) : Observable<CandidateDocumentResDto[]>{
        return this.base.getWithoutPipe<CandidateDocumentResDto[]>(`${BASE_URL}/candidate-documents?id=${id}`);

    }

    create(data : CandidateDocumentInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/candidate-documents`,data);
    }

    update(data : CandidateDocumentUpdateReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/candidate-documents`,data);
    }

    delete(id : string) : Observable<DeleteResDto>{
        return this.base.delete<DeleteResDto>(`${BASE_URL}/candidate-documents/${id}`,true);
    }
}
