import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { ReligionResDto } from "../dto/religion/religion.res.dto";
import { BASE_URL } from "../constant/api.constant";

@Injectable({
    providedIn : 'root'
})
export class ReligionService{
    constructor(private base : BaseService){}

    getAll() : Observable<ReligionResDto[]>{
        return this.base.getWithoutPipe<ReligionResDto[]>(`${BASE_URL}/religions`);
    }

}
