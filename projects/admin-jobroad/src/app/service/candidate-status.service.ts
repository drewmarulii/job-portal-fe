import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/api.constant";
import { CandidateStatusResDto } from "../dto/candidate-status/candidate-status.res.dto";

@Injectable({
    providedIn: 'root'
})
export class CandidateStatusService {
    constructor(private base: BaseService) { }

    getAll(): Observable<CandidateStatusResDto[]> {
        return this.base.getWithoutPipe<CandidateStatusResDto[]>(`${BASE_URL}/candidate-status`);
    }

}
