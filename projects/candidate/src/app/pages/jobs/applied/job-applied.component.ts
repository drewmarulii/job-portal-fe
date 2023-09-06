import { Component, OnInit } from "@angular/core";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { JobService } from "../../../service/job.service";
import { ApplicantService } from "../../../service/applicant.service";
import { ApplicantResDto } from "../../../dto/applicant/applicant.res.dto";
import { firstValueFrom } from "rxjs";
import { AssignedQuestionService } from "../../../service/assigned-job.service";
import { AssignedJobQuestionResDto } from "../../../dto/assigned-job-question/assigned-job-question.res.dto";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'job-applied',
  templateUrl: './job-applied.component.html',

})
export class JobAppliedComponent implements OnInit {


  appliedJob!: ApplicantResDto[]
  appliedJobLength!: number
  assignedQuestion!: AssignedJobQuestionResDto[];

  constructor(private applicantService: ApplicantService,
    private assignedQuestionService: AssignedQuestionService,
    private router: Router,
    private title: Title) {
    this.title.setTitle("Applied Jobs")
  }

  ngOnInit(): void {
    this.getAppliedJob();

  }


  getAppliedJob() {
    firstValueFrom(this.applicantService.getByPrincipal()).then(result => {
      this.appliedJob = result
      this.appliedJobLength = this.appliedJob.length
    })
  }

  getQuestion(jobId: string, appId: string) {
    console.log('question')
    firstValueFrom(this.assignedQuestionService.getByJob(jobId)).then(result => {
      if (result.length != 0) {
        console.log('result => ', result);
        this.assignedQuestion = result
        this.router.navigateByUrl(`/questions/${appId}`)
      } else {
        console.log('Kosong');
      }
    })
  }


  checker(statusName: string) {
    if (statusName == "APPLIED") {
      return "info";
    }
    else if (statusName == "HIRED") {
      return "success"
    }
    else if (statusName == "REJECT") {
      return "danger"
    }
    else {
      return "warning"
    }
  }


  check() {
    return this.appliedJobLength > 0
  }
}
