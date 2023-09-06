import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/api.constant";
import { MaritalResDto } from "../dto/marital/marital.res.dto";

@Injectable({
    providedIn: 'root'
})
export class MaritalStatusService {
    constructor(private base: BaseService) { }

    getAll(): Observable<MaritalResDto[]> {
        return this.base.getWithoutPipe<MaritalResDto[]>(`${BASE_URL}/marital-status`);
    }

}
