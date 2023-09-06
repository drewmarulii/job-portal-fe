import { Observable } from "rxjs";
import { BASE_URL } from "../constant/api.constant";
import { AssignedJobQuestionResDto } from "../dto/assigned-job-question/assigned-job-question.res.dto";
import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})
export class AssignedQuestionService{
    constructor(private base : BaseService){}
    getByJob(id : string) : Observable<AssignedJobQuestionResDto[]>{
        return this.base.getWithoutPipe<AssignedJobQuestionResDto[]>(`${BASE_URL}/assigned-jobs?id=${id}`);
    }
}