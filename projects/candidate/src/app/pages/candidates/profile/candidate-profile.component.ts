import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../service/auth.service";
import { CandidateUserService } from "../../../service/candidate-user.service";
import { CandidateMasterResDto } from "../../../dto/candidate-user/candidate-master.res.dto";
import { CandidateAddressService } from "../../../service/candidate-address.service";
import { CandidateAddressResDto } from "../../../dto/candidate-address/candidate-address.res.dto";
import { CandidateEducationService } from "../../../service/candidate-education.service";
import { CandidateEducationResDto } from "../../../dto/candidate-education/candidate-education.res.dto";
import { CandidateFamilyService } from "../../../service/candidate-family.service";
import { CandidateFamilyResDto } from "../../../dto/candidate-family/candidate-family.res.dto";
import { CandidateDocumentResDto } from "../../../dto/candidate-document/candidate-document.res.dto";
import { CandidateLanguageResDto } from "../../../dto/candidate-language/candidate-language.res.dto";
import { CandidateProjectResDto } from "../../../dto/candidate-project/candidate-project.res.dto";
import { CandidateReferencesResDto } from "../../../dto/candidate-references/candidate-references.res.dto";
import { CandidateSkillResDto } from "../../../dto/candidate-skill/candidate-skill.res.dto";
import { CandidateTrainingResDto } from "../../../dto/candidate-training/candidate-training.res.dto";
import { CandidateWorkResDto } from "../../../dto/candidate-work/candidate-work.res.dto";
import { CandidateDocumentService } from "../../../service/candidate-documents.service";
import { CandidateLanguageService } from "../../../service/candidate-language.service";
import { CandidateProjectExpService } from "../../../service/candidate-project-exp.service";
import { CandidateReferenceService } from "../../../service/candidate-reference.service";
import { CandidateSkillService } from "../../../service/candidate-skill.service";
import { CandidateTrainingExpService } from "../../../service/candidate-training-exp.service";
import { CandidateWorkExpService } from "../../../service/candidate-work-exp.service";
import { firstValueFrom } from "rxjs";
import { Title } from "@angular/platform-browser";
import { BASE_URL } from "../../../constant/api.constant";
import { BaseService } from "../../../service/base.service";

@Component({
  selector: 'candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls:['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {

  imageUrl!: string

  candidateId!: string
  candidateUser?: CandidateMasterResDto
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
    private title: Title,
    private base: BaseService
  ) {
    this.title.setTitle("Profile")
  }

  ngOnInit(): void {
    const profile = this.authService.getProfile()

    if (profile) {
      this.candidateId = profile.userId
    }

    this.base.all([
      this.candidateService.getById(this.candidateId),
      this.candidateAddressService.getByCandidate(this.candidateId),
      this.candidateEducationService.getByCandidate(this.candidateId),
      this.candidateFamilyService.getByCandidate(this.candidateId),
      this.candidateDocumentService.getByCandidate(this.candidateId),
      this.candidateLanguageService.getByCandidate(this.candidateId),
      this.candidateProjectExpService.getByCandidate(this.candidateId),
      this.candidateReferenceService.getByCandidate(this.candidateId),
      this.candidateSkillService.getByCandidate(this.candidateId),
      this.candidateTrainingExpService.getByCandidate(this.candidateId),
      this.candidateWorkExpService.getByCandidate(this.candidateId),
    ]).then(res => {
      this.candidateUser = res[0]

      if (this.candidateUser?.candidateProfile?.fileId) {
        this.imageUrl = `${BASE_URL}/files/${this.candidateUser?.candidateProfile?.fileId}`
      } else {
        this.imageUrl = '../../../assets/emptyProfile.jpeg'
      }
      const dataProfile = JSON.parse(localStorage.getItem('data')!)
      dataProfile.photoId = this.candidateUser?.candidateProfile?.fileId
      localStorage.setItem('data', JSON.stringify(dataProfile))
      this.candidateService.navbarObservable(this.candidateUser?.candidateProfile?.fileId)


      this.candidateAddresses = res[1]
      this.candidateEducations = res[2]
      this.candidateFamilies = res[3]
      this.candidateDocuments = res[4]
      this.candidateLanguages = res[5]
      this.candidateProjects = res[6]
      this.candidateReferences = res[7]
      this.candidateSkills = res[8]
      this.candidateTrainings = res[9]
      this.candidateWorks = res[10]


    })

  }
}
