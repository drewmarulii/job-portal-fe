import { Observable } from "rxjs";
import { BASE_URL } from "../constant/api.constant";
import { QuestionOptionResDto } from "../dto/question-option/question-option.res.dto";
import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { UpdateResDto } from "../dto/update.res.dto";
import { QuestionOptionUpdateReqDto } from "../dto/question-option/question-option-update.req.dto";

@Injectable({
    providedIn : 'root'
})
export class QuestionOptionService{
    constructor(private base : BaseService){}
    getByQuestion(id : string) : Observable<QuestionOptionResDto[]> {
        return this.base.getWithoutPipe<QuestionOptionResDto[]>(`${BASE_URL}/options?id=${id}`);
    }
    updateOption(data : QuestionOptionUpdateReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/options`,data);
    }
    getById(id : string)  : Observable<QuestionOptionResDto> {
        return this.base.getWithoutPipe<QuestionOptionResDto>(`${BASE_URL}/options/detail?id=${id}`);
    }
}
