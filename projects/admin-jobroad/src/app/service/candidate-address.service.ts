import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";

import { CandidateAddressResDto } from "../dto/candidate-address/candidate-address.res.dto";
import { CandidateAddressInsertReqDto } from "../dto/candidate-address/candidate-address-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { DeleteResDto } from "../dto/delete.res.dto";
import { CandiateAddressUpdateReqDto } from "../dto/candidate-address/candidate-address-update.req.dto";

@Injectable({
    providedIn : 'root'
})
export class CandidateAddressService{
    constructor(private base : BaseService){}
    getByCandidate(id : string) : Observable<CandidateAddressResDto[]>{
        return this.base.getWithoutPipe<CandidateAddressResDto[]>(`${BASE_URL}/candidate-address?id=${id}`);
    }

    create(data : CandidateAddressInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/candidate-address`,data);
    }

    update(data : CandiateAddressUpdateReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/candidate-address`,data);
    }

    delete(id : string) : Observable<DeleteResDto>{
        return this.base.delete<DeleteResDto>(`${BASE_URL}/candidate-address/${id}`, true);
    }
}
