import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { QuestionResDto } from "../dto/question/question.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { QuestionInsertReqDto } from "../dto/question/question-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { QuestionsInsertReqDto } from "../dto/question/questions-insert.req.dto";
import { QuestionUpdateReqDto } from "../dto/question/question.update.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";

@Injectable({
    providedIn : 'root'
})
export class QuestionService{
    constructor(private base : BaseService){}

    getAll() : Observable<QuestionResDto[]>{
        return this.base.getWithoutPipe<QuestionResDto[]>(`${BASE_URL}/questions`);
    }

    create(data : QuestionsInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/questions`,data);
    }

    getById(id : string) : Observable<QuestionResDto>{
        return this.base.getWithoutPipe<QuestionResDto>(`${BASE_URL}/questions/filter?id=${id}`);
    }

    update(data : QuestionUpdateReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/questions`,data);
    }
}
