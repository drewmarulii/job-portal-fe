import { Component, OnInit } from "@angular/core";
import { CandidateUserResDto } from "../../../dto/candidate-user/candidate-user.res.dto";
import { CandidateUserService } from "../../../service/candidate-user.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable, firstValueFrom } from "rxjs";
import { CandidateAddressResDto } from "../../../dto/candidate-address/candidate-address.res.dto";
import { CandidateEducationService } from "../../../service/candidate-education.service";
import { CandidateEducationResDto } from "../../../dto/candidate-education/candidate-education.res.dto";
import { CandidateAddressService } from "../../../service/candidate-address.service";
import { CandidateDocumentService } from "../../../service/candidate-documents.service";
import { CandidateFamilyService } from "../../../service/candidate-family.service";
import { CandidateLanguageService } from "../../../service/candidate-language.service";
import { CandidateProjectExpService } from "../../../service/candidate-project-exp.service";
import { CandidateReferenceService } from "../../../service/candidate-reference.service";
import { CandidateSkillService } from "../../../service/candidate-skill.service";
import { CandidateTrainingExpService } from "../../../service/candidate-training-exp.service";
import { CandidateWorkExpService } from "../../../service/candidate-work-exp.service";
import { CandidateDocumentResDto } from "../../../dto/candidate-document/candidate-document.res.dto";
import { CandidateFamilyResDto } from "../../../dto/candidate-family/candidate-family.res.dto";
import { CandidateLanguageResDto } from "../../../dto/candidate-language/candidate-language.res.dto";
import { CandidateProjectResDto } from "../../../dto/candidate-project/candidate-project.res.dto";
import { CandidateReferencesResDto } from "../../../dto/candidate-references/candidate-references.res.dto";
import { CandidateSkillResDto } from "../../../dto/candidate-skill/candidate-skill.res.dto";
import { CandidateTrainingResDto } from "../../../dto/candidate-training/candidate-training.res.dto";
import { CandidateWorkResDto } from "../../../dto/candidate-work/candidate-work.res.dto";
import { BaseService } from "../../../service/base.service";
import { BASE_URL } from "../../../constant/api.constant";
import { Title } from "@angular/platform-browser";
import { AuthService } from "../../../service/auth.service";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { JobService } from "../../../service/job.service";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { EmployeeService } from "../../../service/employee.service";
import { PersonTypeService } from "../../../service/person-type.service";
import { PersonTypeCodeEnum } from "../../../constant/person-type.constant";

function getParams(activatedRoute: ActivatedRoute, parentLevel?: number): Observable<Params> {
  let route = activatedRoute
  if (parentLevel) {
    for (let i = 0; i < parentLevel; i++) {
      if (route.parent) {
        route = route.parent
      }
    }
  }
  return route.params
}
@Component({
  selector: 'candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {
  imageUrl!: string
  loading = false
  disabled = true
  disabledAssign = false
  dialogAssignJob = false
  candidateUser? : CandidateUserResDto
  candidateAddresses!: CandidateAddressResDto[]
  candidateDocuments!: CandidateDocumentResDto[]
  candidateEducations!: CandidateEducationResDto[]
  candidateFamilies!: CandidateFamilyResDto[]
  candidateLanguages!: CandidateLanguageResDto[]
  candidateProjects!: CandidateProjectResDto[]
  candidateReferences!: CandidateReferencesResDto[]
  candidateSkills!: CandidateSkillResDto[]
  candidateTrainings!: CandidateTrainingResDto[]
  candidateWorks!: CandidateWorkResDto[]
  jobs!: JobResDto[]
  candidateId!: string

  employeeInsertReqDto = this.fb.group({
    candidateId: ['', [Validators.required]],
    jobId: ['', [Validators.required]]
  })

  constructor(
    private authService: AuthService,
    private candidateService: CandidateUserService,
    private candidateAddressService: CandidateAddressService,
    private candidateDocumentService: CandidateDocumentService,
    private candidateEducationService: CandidateEducationService,
    private candidateFamilyService: CandidateFamilyService,
    private candidateLanguageService: CandidateLanguageService,
    private candidateProjectExpService: CandidateProjectExpService,
    private candidateReferenceService: CandidateReferenceService,
    private candidateSkillService: CandidateSkillService,
    private candidateTrainingExpService: CandidateTrainingExpService,
    private candidateWorkExpService: CandidateWorkExpService,
    private employeeService: EmployeeService,
    private jobService: JobService,
    private personTypeService : PersonTypeService,
    private route: ActivatedRoute,
    private base: BaseService,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private title: Title
  ) {
    this.title.setTitle("Candidate Detail")
  }

  ngOnInit(): void {
    firstValueFrom(getParams(this.route, 0)).then((res) => {
      this.candidateId = res['id']
      this.base.all([
        this.candidateService.getCandidateUserById(res['id']),
        this.candidateAddressService.getByCandidate(res['id']),
        this.candidateEducationService.getByCandidate(res['id']),
        this.candidateFamilyService.getByCandidate(res['id']),
        this.candidateLanguageService.getByCandidate(res['id']),
        this.candidateProjectExpService.getByCandidate(res['id']),
        this.candidateReferenceService.getByCandidate(res['id']),
        this.candidateSkillService.getByCandidate(res['id']),
        this.candidateTrainingExpService.getByCandidate(res['id']),
        this.candidateWorkExpService.getByCandidate(res['id']),
        this.candidateDocumentService.getByCandidate(res['id'])
      ]).then(result => {
        this.candidateUser = result[0]
        this.candidateAddresses = result[1]
        this.candidateEducations = result[2]
        this.candidateFamilies = result[3]
        this.candidateLanguages = result[4]
        this.candidateProjects = result[5]
        this.candidateReferences = result[6]
        this.candidateSkills = result[7]
        this.candidateTrainings = result[8]
        this.candidateWorks = result[9]
        this.candidateDocuments = result[10]

        if (this.candidateUser?.fileId) {
          this.imageUrl = `http://localhost:8080/files/${this.candidateUser?.fileId}`
        } else {
          this.imageUrl = '../../../assets/emptyProfile.jpeg'
        }

        firstValueFrom(this.personTypeService.getById(this.candidateUser?.personTypeId)).then((res) => {
          if(res.typeCode === PersonTypeCodeEnum.EMPLOYEE) {
            this.disabledAssign = true
          }
        })

        const profile = this.authService.getProfile()
        if (this.candidateUser?.createdBy === profile?.userId) {
          this.disabled = false
        }

      })
    })

  }

  showAssignJob() {
    this.jobService.getAll().subscribe((res) => {
      this.jobs = res
    })

    this.dialogAssignJob = true

    this.employeeInsertReqDto.patchValue({
      candidateId: this.candidateUser?.id
    })
  }

  addEmployee() {
    if (this.employeeInsertReqDto.valid) {
      const data = this.employeeInsertReqDto.getRawValue()
      firstValueFrom(this.employeeService.createFromAdmin(data)).then((res) => {
        this.base.all([
          this.candidateService.getCandidateUserById(this.candidateId)
        ]).then(res => {
          this.candidateUser = res[0]
        })

        this.employeeInsertReqDto.reset()
        this.dialogAssignJob = false
      })
    }
  }

  downloadFile(id: string) {
    window.open(`http://localhost:8080/files/${id}`)
  }
}
