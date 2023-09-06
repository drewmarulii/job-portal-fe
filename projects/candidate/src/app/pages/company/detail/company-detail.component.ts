import { Component, OnInit } from "@angular/core";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { BaseService } from "../../../service/base.service";
import { CompanyService } from "../../../service/company.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first, firstValueFrom } from "rxjs";
import { JobService } from "../../../service/job.service";


@Component({
    selector: 'company-detail',
    templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {

    company?: CompanyResDto
    companyId!: string
    jobsByCompany!: JobResDto[]

    constructor(private base: BaseService,
        private companyService: CompanyService,
        private activated: ActivatedRoute,
        private jobService: JobService,
        private router: Router) {
    }

    ngOnInit(): void {
        firstValueFrom(this.activated.params).then(result => {
            const id = result["id"]
            this.companyId = id

            this.base.all([
                this.companyService.getDetail(this.companyId),
            ]).then(res => {
                this.company = res[0]
                firstValueFrom(this.jobService.getByCompany(this.company?.companyCode)).then(result => {
                    this.jobsByCompany = result
                })
            }
            )
        })


    }

    jobDetail(jobId: string) {
        this.jobService.fromComponent = this.companyId
        this.router.navigateByUrl(`/jobs/${jobId}/detail`)
    }


}