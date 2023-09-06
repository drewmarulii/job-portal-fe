import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { InterviewInsertReqDto } from "../dto/interview/interview-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "../dto/insert.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { InterviewResDto } from "../dto/interview/interviewe.res.dto";

@Injectable({
   providedIn : 'root'
})
export class InterviewService{
    constructor(private base : BaseService){}

    create(data : InterviewInsertReqDto) : Observable <InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/interviews`,data);
    }
    getByApplicant(id : string) : Observable<InterviewResDto> {
        return this.base.getWithoutPipe<InterviewResDto>(`${BASE_URL}/interviews?applicantId=${id}`);
    }

}
