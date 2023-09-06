import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ReportService } from "../../../service/report.service";
import { ReportResDto } from "../../../dto/report/report.res.dto";
import { firstValueFrom } from "rxjs";
import { FormControl, NonNullableFormBuilder, Validators } from "@angular/forms";
import { convertUTCToLocalDate } from "../../../util/convert-date.util";


@Component({
    selector: 'report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, AfterViewChecked {
    reports!: ReportResDto[];
    startDate!: string;
    endDate!: string;

    reportUrl = ""

    filterData = this.fb.group({
        startDateTemp: ['', [Validators.required]],
        endDateTemp: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]]
    })

    constructor(
        private reportService: ReportService,
        private fb: NonNullableFormBuilder,
        private cd: ChangeDetectorRef) { }

    ngAfterViewChecked(): void {
        this.cd.detectChanges()
    }

    ngOnInit(): void {
        this.getReports(this.startDate, this.endDate);
    }
    getReports(start: string, end: string) {
        firstValueFrom(this.reportService.getReport(start, end)).then(result => {
            this.reports = result;
        })
    }

    convertStartDate(event: any) {
        this.filterData.patchValue({
            startDate: convertUTCToLocalDate(event)
        })
    }

    convertEndDate(event: any) {
        this.filterData.patchValue({
            endDate: convertUTCToLocalDate(event)
        })

    }

    filter() {
        const data = this.filterData.getRawValue()
        const newStartDate = convertUTCToLocalDate(data.startDateTemp as any);
        let newEndDate: string = '';
        if (data.endDateTemp != null) {
            newEndDate = convertUTCToLocalDate(data.endDateTemp as any);
            console.log("New End Date :  " + newEndDate);
        }
        this.getReports(newStartDate, newEndDate);

        this.reportUrl = `http://localhost:8080/reports/download?startDate=${newStartDate}&endDate=${newEndDate}`
        console.log(this.reportUrl);
    }
}
