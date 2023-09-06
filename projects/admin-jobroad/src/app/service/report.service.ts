import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { ReportResDto } from "../dto/report/report.res.dto";
import { BASE_URL } from "../constant/api.constant";

@Injectable({
    providedIn: 'root'
})

export class ReportService {
    constructor(private base: BaseService) { }

    getReport(startDate: string, endDate: string): Observable<ReportResDto[]> {
        let url = `${BASE_URL}/reports?`
        if (startDate != null) {
            url = url + `startDate=${startDate}`
        }
        if (endDate != null) {
            if (endDate != '') {
                if (startDate != null) {
                    url = url + `&endDate=${endDate}`
                } else {
                    url = url + `endDate=${endDate}`
                }
            }
        }
        return this.base.getWithoutPipe<ReportResDto[]>(url);
    }

}