import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { CompanyService } from "../../service/company.service";
import { CompanyResDto } from "../../dto/company/company.res.dto";
import { UserResDto } from "../../dto/user/user.res.dto";
import { UserService } from "../../service/user.service";
import { JobService } from "../../service/job.service";
import { JobResDto } from "../../dto/job/job.res.dto";
import { BenefitResDto } from "../../dto/benefit/benefit.res.dto";
import { QuestionResDto } from "../../dto/question/question.res.dto";
import { CandidateUserResDto } from "../../dto/candidate-user/candidate-user.res.dto";
import { BenefitService } from "../../service/benefit.service";
import { QuestionService } from "../../service/question.service";
import { CandidateUserService } from "../../service/candidate-user.service";
import { firstValueFrom } from "rxjs";
import { BaseService } from "../../service/base.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  fullName = ''
  salutation = ''
  companies!: CompanyResDto[]
  jobs!: JobResDto[]
  jobSize = 0
  benefits!: BenefitResDto[]
  benefitSize = 0
  questions!: QuestionResDto[]
  questionSize = 0
  candidates!: CandidateUserResDto[]
  candidateSize = 0
  companySize = 0
  users!: UserResDto[]
  userSize = 0

  constructor(private authService: AuthService, private companyService: CompanyService, private userService: UserService, private jobService: JobService, private benefitService: BenefitService, private questionService: QuestionService, private candidateService: CandidateUserService,
    private base: BaseService, private title: Title) {
    this.title.setTitle("Dashboard")
  }

  ngOnInit(): void {
    const profile = this.authService.getProfile()

    if (profile) {
      this.fullName = profile.fullName
    }

    this.base.all([
      this.companyService.getAll(),
      this.userService.getAllUser(),
      this.jobService.getAll(),
      this.benefitService.getAll(),
      this.questionService.getAll(),
      this.candidateService.getAll()
    ]).then(res => {
      this.companies = res[0]
      this.companySize = this.companies.length
      this.users = res[1]
      this.userSize = this.users.length
      this.jobs = res[2]
      this.jobSize = this.jobs.length
      this.benefits = res[3]
      this.benefitSize = this.benefits.length
      this.questions = res[4]
      this.questionSize = this.questions.length
      this.candidates = res[5]
      this.candidateSize = this.candidates.length
    })
  }


}
