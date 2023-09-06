import { Component, OnDestroy, OnInit } from "@angular/core";
import { JobService } from "../../../service/job.service";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { ApplicantService } from "../../../service/applicant.service";
import { ApplicantResDto } from "../../../dto/applicant/applicant.res.dto";
import { Subscription, firstValueFrom } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Table } from "primeng/table";
import { HiringStatusEnum } from "../../../constant/hiring-status.constant";
import { BaseService } from "../../../service/base.service";
import { Title } from "@angular/platform-browser";
import { BASE_URL } from "../../../constant/api.constant";
import { AuthService } from "../../../service/auth.service";
import { RoleCodeEnum } from "../../../constant/user-role.constant";

@Component({
  selector: 'job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit, OnDestroy {
  imageUrlBanner!: string
  imageUrlCompany!: string
  job?: JobResDto;
  applicant!: ApplicantResDto[];
  jobSubscription!: Subscription
  applicantSubscription!: Subscription;
  loading = false;
  jobId!: string;
  reject = HiringStatusEnum.REJECT;
  hired = HiringStatusEnum.HIRED;
  personId!: string;
  isOwner = false;

  constructor(
    private jobService: JobService,
    private applicantService: ApplicantService,
    private activated: ActivatedRoute,
    private base: BaseService,
    private title: Title,
    private authService: AuthService
  ) {


    this.title.setTitle("Job Detail")
  }

  ngOnInit(): void {

    const data = this.authService.getProfile()
    if (data) {
      this.personId = data.userId

    }


    firstValueFrom(this.activated.params).then(param => {
      this.jobSubscription = this.jobService.getByDetail(param['id']).subscribe(result => {
        this.job = result;

        this.imageUrlBanner = this.job?.fileId

        this.imageUrlCompany = this.job?.companyPhotoId

        this.checkOwner()


      });
      this.jobId = param['id'];
      this.applicantSubscription = this.applicantService.getByJob(param['id']).subscribe(result => {
        this.applicant = result;
      });
    })

  }

  ngOnDestroy(): void {
    this.jobSubscription.unsubscribe();
    this.applicantSubscription.unsubscribe();
  }

  checkOwner() {
    const data = this.authService.getProfile()
    console.log(data?.userId);
    console.log(this.job?.createdBy);
    if (data?.userId == this.job?.createdBy) {
      this.isOwner = !this.isOwner
    }
  }

  checkRole() {

    return this.authService.getProfile()?.roleCode == RoleCodeEnum.ADMIN
  }

}
