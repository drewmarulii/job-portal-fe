import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { JobService } from "../../../service/job.service";
import { ApplicantService } from "../../../service/applicant.service";
import { firstValueFrom } from "rxjs";
import { CandidateUserService } from "../../../service/candidate-user.service";
import { CandidateCheckDataResDto } from "../../../dto/candidate/candidate-check-data.res.dto";
import { ApplicantResDto } from "../../../dto/applicant/applicant.res.dto";
import { Title } from "@angular/platform-browser";
import { BASE_URL } from "../../../constant/api.constant";

@Component({
    selector: 'job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
    imageUrlBanner!: string
    imageUrlCompany!: string
    job?: JobResDto
    jobId!: string
    visible: boolean = false;
    isValid!: CandidateCheckDataResDto
    askToProfile: boolean = false
    appliedJob!: ApplicantResDto[];
    applied = false;
    label = "Apply Job";
    constructor(private activated: ActivatedRoute,
        private jobService: JobService,
        private applicantService: ApplicantService,
        private router: Router,
        private candidateService: CandidateUserService,
        private title: Title
    ) {
        this.title.setTitle("Job Detail")
    }

    ngOnInit(): void {
        firstValueFrom(this.activated.params).then(result => {
            const id = result["id"]
            this.jobId = id
            this.getJobDetail(this.jobId)
        })
    }


    apply(jobId: string) {

        const applicantDto = {
            jobId
        }

        firstValueFrom(this.candidateService.checkData()).then(result => {
            this.isValid = result

            if (this.isValid.valid) {
                firstValueFrom(this.applicantService.create(applicantDto)).then(result => {
                    this.router.navigateByUrl("/dashboard")
                })
            }
            else {
                this.askToProfile = !this.askToProfile
            }
        })


    }

    getAppliedJob() {
        firstValueFrom(this.applicantService.getByPrincipal()).then(result => {
            this.appliedJob = result
            this.isApplied();

        })
    }

    isApplied() {
        if (this.appliedJob) {
            console.log('Applie job == ' + JSON.stringify(this.appliedJob))
            for (let i = 0; i < this.appliedJob.length; i++) {
                if (this.appliedJob[i].jobName == this.job?.jobName) {
                    this.applied = true
                    this.label = "Applied"
                    break;
                } else {
                    this.applied = false
                }
            }
        } else {
            this.applied = false
        }
    }

    getJobDetail(jobId: string) {
        firstValueFrom(this.jobService.getDetail(jobId)).then(result => {
            this.job = result;
            if (this.job?.fileId) {
                this.imageUrlCompany = `${BASE_URL}/files/${this.job?.fileId}`

            }
            else {
                this.imageUrlCompany = '../../../../assets/bannerJob.jpeg'
            }


            if (this.job?.companyPhotoId) {
                this.imageUrlCompany = `${BASE_URL}/files/${this.job?.companyPhotoId}`

            }
            else {
                this.imageUrlCompany = '../../../../assets/companyLogo.png'
            }
            this.getAppliedJob();
        })
    }

    back() {
        if (this.jobService.fromComponent != null) {
            const companyId = this.jobService.fromComponent
            this.router.navigateByUrl(`/companies/${companyId}/detail`)
            this.jobService.fromComponent = null
        }
        else {
            this.router.navigateByUrl('/jobs')
        }
    }

}







