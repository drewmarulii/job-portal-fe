import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { PersonTypeResDto } from "../dto/person-type/person-type.res.dto";

@Injectable({
    providedIn: 'root'
})
export class PersonTypeService {
    constructor(private base: BaseService) { }
    getAll(): Observable<PersonTypeResDto[]> {
        return this.base.getWithoutPipe<PersonTypeResDto[]>(`${BASE_URL}/person-types`);
    }

}
