import { Component, OnInit } from "@angular/core";
import { CandidateUserResDto } from "../../../dto/candidate-user/candidate-user.res.dto";
import { CandidateUserService } from "../../../service/candidate-user.service";
import { ActivatedRoute, Params } from "@angular/router";
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
import { ApplicantResDto } from "../../../dto/applicant/applicant.res.dto";
import { ApplicantService } from "../../../service/applicant.service";
import { Title } from "@angular/platform-browser";
import { BaseService } from "../../../service/base.service";

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
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class ApplicantCandidateDetailComponent implements OnInit {
  loading = false
  imageUrl!: string
  candidateUser?: CandidateUserResDto
  candidateAddresses?: CandidateAddressResDto[]
  candidateDocuments!: CandidateDocumentResDto[]
  candidateEducations!: CandidateEducationResDto[]
  candidateFamilies!: CandidateFamilyResDto[]
  candidateLanguages!: CandidateLanguageResDto[]
  candidateProjects!: CandidateProjectResDto[]
  candidateReferences!: CandidateReferencesResDto[]
  candidateSkills!: CandidateSkillResDto[]
  candidateTrainings!: CandidateTrainingResDto[]
  candidateWorks!: CandidateWorkResDto[]
  candidateId!: string;
  applicant!: ApplicantResDto;
  constructor(
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
    private applicantService: ApplicantService,
    private activated: ActivatedRoute,
    private title: Title,
    private base: BaseService
  ) {
    this.title.setTitle("Application Detail")
  }
  ngOnInit(): void {
    firstValueFrom(this.activated.params).then(params => {
      firstValueFrom(this.applicantService.getById(params['applicantId'])).then(result => {
        console.log(result)
        this.applicant = result
        console.log(this.applicant)
        this.getCandidateData();
      })

    })
  }

  getCandidateData() {
    console.log("Applicant => ", this.applicant)
    this.candidateId = this.applicant.candidateId;
    console.log("Candidate Id => ", this.applicant?.candidateId)
    firstValueFrom(this.candidateService.getCandidateUserById(this.candidateId))
      .then((res) => {
        this.candidateUser = res

        if (this.candidateUser?.fileId) {
          this.imageUrl = `http://localhost:8080/files/${this.candidateUser?.fileId}`
        } else {
          this.imageUrl = '../../../assets/emptyProfile.jpeg'
        }
      })

    firstValueFrom(this.candidateAddressService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateAddresses = res
      })

    firstValueFrom(this.candidateEducationService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateEducations = res
      })

    firstValueFrom(this.candidateFamilyService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateFamilies = res
      })

    firstValueFrom(this.candidateLanguageService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateLanguages = res
      })

    firstValueFrom(this.candidateProjectExpService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateProjects = res
      })

    firstValueFrom(this.candidateReferenceService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateReferences = res
      })

    firstValueFrom(this.candidateSkillService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateSkills = res
      })

    firstValueFrom(this.candidateTrainingExpService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateTrainings = res
      })

    firstValueFrom(this.candidateWorkExpService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateWorks = res
      })

    firstValueFrom(this.candidateDocumentService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateDocuments = res
      })

  }
  
  downloadFile(id: string) {
    window.open(`http://localhost:8080/files/${id}`)
  }
}
