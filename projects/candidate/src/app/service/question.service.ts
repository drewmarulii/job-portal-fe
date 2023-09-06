import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { QuestionResDto } from "../dto/question/question.res.dto";
import { BASE_URL } from "../constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    constructor(private base: BaseService) { }

    getByApplicant(code : string) : Observable<QuestionResDto[]> {

        return this.base.getWithoutPipe<QuestionResDto[]>(`${BASE_URL}/questions?code=${code}`)
    }


}
