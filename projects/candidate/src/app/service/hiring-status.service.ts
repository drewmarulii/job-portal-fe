import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/api.constant";
import { HiringStatusResDto } from "../dto/hiring-status/hiring-status.res.dto";

@Injectable({
    providedIn: 'root'
})
export class HiringStatusService {
    constructor(private base: BaseService) { }
    getAll(): Observable<HiringStatusResDto[]> {
        return this.base.getWithoutPipe<HiringStatusResDto[]>(`${BASE_URL}/hiring-status`);
    }
}
