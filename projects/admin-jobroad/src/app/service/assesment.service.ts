import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { AssesmentInsertReqDto } from "../dto/assessment/assessment-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { AssementResDto } from "../dto/assessment/assement.res.dto";
import { AssesmentUpdateNotesReqDto } from "../dto/assessment/assesment-update-notes.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";

@Injectable({
    providedIn : 'root'
})
export class AssesmentService{
    constructor(private base : BaseService){}


    create(data : AssesmentInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/assesments`,data);
    }

    getByApplicant(id : string) : Observable<AssementResDto>{
        return this.base.getWithoutPipe<AssementResDto>(`${BASE_URL}/assesments?applicantId=${id}`)
    }

    updateNotes(data : AssesmentUpdateNotesReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/assesments`,data);
    }


}
