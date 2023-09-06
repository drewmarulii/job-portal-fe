import { Injectable, NgModule } from "@angular/core";
import { BaseService } from "./base.service";
import { ReviewResDto } from "../dto/review/review.res.dto";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/api.constant";
import { ReviewUpdateNotesReqDto } from "../dto/review/review-update-notes.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";

@Injectable({
    providedIn : 'root'
})
export class ReviewService{
    constructor(private base : BaseService){}
    getByApplicant(id : string) : Observable<ReviewResDto>{
        return this.base.getWithoutPipe<ReviewResDto>(`${BASE_URL}/reviews?applicantId=${id}`);
    }
    updateNotes(data : ReviewUpdateNotesReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/reviews/notes`,data);
    }
}
