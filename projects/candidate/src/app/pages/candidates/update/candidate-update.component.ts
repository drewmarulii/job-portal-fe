import { Component, OnInit } from "@angular/core";
import { CandidateProfileUpdateReqDto } from "../../../dto/candidate-profile/candidate-profile-update.req.dto";
import { CandidateMasterResDto } from "../../../dto/candidate-user/candidate-master.res.dto";
import { CandidateAddressResDto } from "../../../dto/candidate-address/candidate-address.res.dto";
import { CandidateDocumentResDto } from "../../../dto/candidate-document/candidate-document.res.dto";
import { CandidateEducationResDto } from "../../../dto/candidate-education/candidate-education.res.dto";
import { CandidateFamilyResDto } from "../../../dto/candidate-family/candidate-family.res.dto";
import { CandidateLanguageResDto } from "../../../dto/candidate-language/candidate-language.res.dto";
import { CandidateProjectResDto } from "../../../dto/candidate-project/candidate-project.res.dto";
import { CandidateReferencesResDto } from "../../../dto/candidate-references/candidate-references.res.dto";
import { CandidateTrainingResDto } from "../../../dto/candidate-training/candidate-training.res.dto";
import { CandidateSkillResDto } from "../../../dto/candidate-skill/candidate-skill.res.dto";
import { CandidateWorkResDto } from "../../../dto/candidate-work/candidate-work.res.dto";
import { MaritalResDto } from "../../../dto/marital/marital.res.dto";
import { ReligionResDto } from "../../../dto/religion/religion.res.dto";
import { PersonTypeResDto } from "../../../dto/person-type/person-type.res.dto";
import { CandidateStatusResDto } from "../../../dto/candidate-status/candidate-status.res.dto";
import { FileTypeResDto } from "../../../dto/file-type/file-type.res.dto";
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { ReligionService } from "../../../service/religion.service";
import { PersonTypeService } from "../../../service/person-type.service";
import { MaritalStatusService } from "../../../service/maritalstatus.service";
import { FileTypeService } from "../../../service/file-type.service";
import { CandidateUserService } from "../../../service/candidate-user.service";
import { CandidateAddressService } from "../../../service/candidate-address.service";
import { CandidateDocumentService } from "../../../service/candidate-documents.service";
import { CandidateEducationService } from "../../../service/candidate-education.service";
import { CandidateFamilyService } from "../../../service/candidate-family.service";
import { CandidateLanguageService } from "../../../service/candidate-language.service";
import { CandidateProjectExpService } from "../../../service/candidate-project-exp.service";
import { CandidateReferenceService } from "../../../service/candidate-reference.service";
import { CandidateSkillService } from "../../../service/candidate-skill.service";
import { CandidateTrainingExpService } from "../../../service/candidate-training-exp.service";
import { CandidateWorkExpService } from "../../../service/candidate-work-exp.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FileUpload } from "primeng/fileupload";
import { AuthService } from "../../../service/auth.service";
import { CandidateStatusService } from "../../../service/candidate-status.service";
import { BaseService } from "../../../service/base.service";
import { LoginResDto } from "../../../dto/login/login.res.dto";
import { BASE_URL } from "../../../constant/api.constant";

interface Salutation {
  value: string;
  label: string;
}
interface Gender {
  value: string;
  label: string;
}
interface ResidenceType {
  value: string,
  label: string
}
interface Degree {
  value: string,
  label: string
}
@Component({
  selector: 'candidate-update',
  templateUrl: './candidate-update.component.html',
  styleUrls:['./candidate-update.component.css']
})
export class CandidateUpdateComponent implements OnInit {
  birthDateCandidate!: Date
  imageUrl!: string
  loading = false
  addressId!: string
  educationId!: string
  workingId!: string
  trainingId!: string
  projectId!: string
  skillId!: string
  languageId!: string
  familyId!: string
  referenceId!: string
  documentId!: string
  dialogDeleteAddress: boolean = false
  dialogDeleteEducation: boolean = false
  dialogDeleteWorking: boolean = false
  dialogDeleteTraining: boolean = false
  dialogDeleteProject: boolean = false
  dialogDeleteSkill: boolean = false
  dialogDeleteLanguage: boolean = false
  dialogDeleteFamily: boolean = false
  dialogDeleteReference: boolean = false
  dialogDeleteDocument: boolean = false
  dialogAddress: boolean = false
  dialogEducation: boolean = false
  dialogFamily: boolean = false
  dialogSkill: boolean = false
  dialogLanguage: boolean = false
  dialogReference: boolean = false
  dialogWorking: boolean = false
  dialogTraining: boolean = false
  dialogProject: boolean = false
  dialogDocument: boolean = false
  candidateProfile!: CandidateProfileUpdateReqDto
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
  degrees: Degree[] | undefined
  salutations: Salutation[] | undefined
  genders: Gender[] | undefined
  residenceType: ResidenceType[] | undefined
  maritals!: MaritalResDto[]
  religions!: ReligionResDto[]
  types!: PersonTypeResDto[]
  candidateStatus!: CandidateStatusResDto[]
  fileTypes!: FileTypeResDto[]
  candidateId!: string
  profileAuth!:LoginResDto | null

  candidateUpdateInsertReqDto = this.fb.group({
    id: ['', [Validators.required]],
    userEmail: ['', [Validators.required]],
    userPassword: ['', [Validators.required]],
    profile: this.fb.group({
      id: ['', [Validators.required]],
      salutation: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      expectedSalary: new FormControl<number | null>(null,Validators.required),
      phoneNumber: [''],
      mobileNumber: ['', [Validators.required]],
      nik: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      birthDateTemp: new FormControl<Date | null>(null),
      birthPlace: ['', [Validators.required]],
      maritalStatusCode: [''],
      maritalStatusId: ['', [Validators.required]],
      religionCode: [''],
      religionId: ['', [Validators.required]],
      personTypeCode: [''],
      personTypeId: ['', [Validators.required]],
      fileId: [''],
      file: [''],
      fileExtension: [''],
      candidateStatusCode: [''],
      candidateStatusId: ['', [Validators.required]]
    })
  })

  trainingInsertReqDto = this.fb.group({
    organizationName: ['', [Validators.required]],
    trainingName: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    startDateTemp: new FormControl<Date | null>(null),
    endDate: ['', [Validators.required]],
    endDateTemp: new FormControl<Date | null>(null),
    email: ['', [Validators.required]]
  })

  addressInsertReqDto = this.fb.group({
    address: ['', [Validators.required]],
    residenceType: ['', [Validators.required]],
    country: ['', [Validators.required]],
    province: ['', [Validators.required]],
    city: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    candidateId: ['', [Validators.required]],
    email: ['', [Validators.required]]
  })

  educationInsertReqDto = this.fb.group({
    degreeName: ['', [Validators.required]],
    instituitionName: ['', [Validators.required]],
    majors: ['', [Validators.required]],
    cgpa: [0, [Validators.required]],
    startYear: ['', [Validators.required]],
    startYearTemp: new FormControl<Date | null>(null),
    endYear: ['', [Validators.required]],
    endYearTemp: new FormControl<Date | null>(null),
    candidateId: ['', [Validators.required]],
    email: ['', [Validators.required]]
  })

  workingInsertReqDto = this.fb.group({
    positionName: ['', [Validators.required]],
    companyName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    responsibility: ['', [Validators.required]],
    reasonLeave: ['', [Validators.required]],
    lastSalary: [0, [Validators.required]],
    startDate: ['', [Validators.required]],
    startDateTemp: new FormControl<Date | null>(null),
    endDate: ['', [Validators.required]],
    endDateTemp: new FormControl<Date | null>(null),
    candidateId: ['', [Validators.required]],
    email: ['', [Validators.required]]
  })

  projectInsertReqDto = this.fb.group({
    projectName: ['', [Validators.required]],
    projectUrl: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    startDateTemp: new FormControl<Date | null>(null),
    endDate: ['', [Validators.required]],
    endDateTemp: new FormControl<Date | null>(null),
    candidateId: ['', [Validators.required]],
    email: ['', [Validators.required]]
  })

  skillInsertReqDto = this.fb.group({
    skillName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    candidateId: ['', [Validators.required]]
  })

  languageInsertReqDto = this.fb.group({
    languageName: ['', [Validators.required]],
    writingRate: ['', [Validators.required]],
    speakingRate: ['', [Validators.required]],
    listeningRate: ['', [Validators.required]],
    email: ['', [Validators.required]]
  })

  familyInsertReqDto = this.fb.group({
    fullname: ['', [Validators.required]],
    relationship: ['', [Validators.required]],
    degreeName: ['', [Validators.required]],
    occupation: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    birthDateTemp: new FormControl<Date | null>(null),
    birthPlace: ['', [Validators.required]],
    email: ['', [Validators.required]]
  })

  referenceInsertReqDto = this.fb.group({
    fullname: ['', [Validators.required]],
    relationship: ['', [Validators.required]],
    occupation: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required]],
    company: ['', [Validators.required]],
    description: ['', [Validators.required]],
    candidateEmail: ['', [Validators.required]]
  })

  documentInsertReqDto = this.fb.group({
    docName: ['', [Validators.required]],
    candidateId: ['', [Validators.required]],
    email: ['', [Validators.required]],
    fileTypeCode: ['', [Validators.required]],
    fileName: ['', [Validators.required]],
    fileExtension: ['', [Validators.required]]
  })

  constructor(
    private authService: AuthService,
    private religionService: ReligionService,
    private personTypeService: PersonTypeService,
    private candidateStatusService: CandidateStatusService,
    private maritalStatusService: MaritalStatusService,
    private fileTypeService: FileTypeService,
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
    private router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder,
    private base: BaseService
  ) { }


  ngOnInit(): void {

    const profile = this.authService.getProfile()
    if (profile) {
      this.candidateId = profile.userId
    }

    this.candidateUpdateInsertReqDto.get('profile.birthDateTemp')?.valueChanges.subscribe(res => {
      const newBirthDate = convertUTCToLocalDate(res as any)
      this.candidateUpdateInsertReqDto.get('profile.birthDate')?.setValue(newBirthDate)
    })

    this.familyInsertReqDto.get('birthDateTemp')?.valueChanges.subscribe(res => {
      const restemp = res as any
      if (restemp instanceof Date) {
        const newBirthDate = convertUTCToLocalDate(res as any)
        this.familyInsertReqDto.get('birthDate')?.setValue(newBirthDate)
      }
    })

    this.educationInsertReqDto.get('startYearTemp')?.valueChanges.subscribe(res => {
      console.log(res);
      const restemp = res as any
      if (restemp instanceof Date) {
        const newStartYear = convertUTCToLocalDate(restemp)
        this.educationInsertReqDto.get('startYear')?.setValue(newStartYear)

      }
    })
    this.educationInsertReqDto.get('endYearTemp')?.valueChanges.subscribe(res => {
      console.log(res);
      const restemp = res as any
      if (restemp instanceof Date) {
        const newEndYear = convertUTCToLocalDate(restemp)
        this.educationInsertReqDto.get('endYear')?.setValue(newEndYear)

      }
    })

    this.workingInsertReqDto.get('startDateTemp')?.valueChanges.subscribe(res => {
      const restemp = res as any
      if (restemp instanceof Date) {
        const newStartDate = convertUTCToLocalDate(res as any)
        this.workingInsertReqDto.get('startDate')?.setValue(newStartDate)
      }
    })
    this.workingInsertReqDto.get('endDateTemp')?.valueChanges.subscribe(res => {
      const restemp = res as any
      if (restemp instanceof Date) {
        const newEndDate = convertUTCToLocalDate(res as any)
        this.workingInsertReqDto.get('endDate')?.setValue(newEndDate)
      }
    })

    this.projectInsertReqDto.get('startDateTemp')?.valueChanges.subscribe(res => {
      const restemp = res as any
      if (restemp instanceof Date) {
        const newStartDate = convertUTCToLocalDate(res as any)
        this.projectInsertReqDto.get('startDate')?.setValue(newStartDate)
      }
    })
    this.projectInsertReqDto.get('endDateTemp')?.valueChanges.subscribe(res => {
      const restemp = res as any
      if (restemp instanceof Date) {
        const newEndDate = convertUTCToLocalDate(res as any)
        this.projectInsertReqDto.get('endDate')?.setValue(newEndDate)
      }
    })

    this.trainingInsertReqDto.get('startDateTemp')?.valueChanges.subscribe(res => {
      const restemp = res as any
      if (restemp instanceof Date) {
        const newStartDate = convertUTCToLocalDate(res as any)
        this.trainingInsertReqDto.get('startDate')?.setValue(newStartDate)
      }
    })
    this.trainingInsertReqDto.get('endDateTemp')?.valueChanges.subscribe(res => {
      const restemp = res as any
      if (restemp instanceof Date) {
        const newEndDate = convertUTCToLocalDate(res as any)
        this.trainingInsertReqDto.get('endDate')?.setValue(newEndDate)
      }
    })

    this.base.all([
      this.candidateService.getById(this.candidateId),
      this.candidateAddressService.getByCandidate(this.candidateId),
      this.candidateEducationService.getByCandidate(this.candidateId),
      this.candidateWorkExpService.getByCandidate(this.candidateId),
      this.candidateTrainingExpService.getByCandidate(this.candidateId),
      this.candidateProjectExpService.getByCandidate(this.candidateId),
      this.candidateSkillService.getByCandidate(this.candidateId),
      this.candidateLanguageService.getByCandidate(this.candidateId),
      this.candidateFamilyService.getByCandidate(this.candidateId),
      this.candidateReferenceService.getByCandidate(this.candidateId),
      this.candidateDocumentService.getByCandidate(this.candidateId),
      this.religionService.getAll(),
      this.personTypeService.getAll(),
      this.candidateStatusService.getAll(),
      this.maritalStatusService.getAll(),
      this.fileTypeService.getAll()
    ]).then(res => {
      this.candidateUser = res[0]

      this.birthDateCandidate = new Date(res[0].candidateProfile.birthDate)
      console.log(this.birthDateCandidate);


      if (this.candidateUser?.candidateProfile?.fileId) {
        this.imageUrl = `${BASE_URL}/files/${this.candidateUser?.candidateProfile?.fileId}`
      } else {
        this.imageUrl = '../../../assets/emptyProfile.jpeg'
      }
      this.candidateUpdateInsertReqDto.patchValue({
        id: res[0].candidateUser.id,
        userEmail: res[0].candidateUser.userEmail,
        userPassword: res[0].candidateUser.userPassword,
        profile: {
          id: res[0].candidateProfile.id,
          salutation: res[0].candidateProfile.salutation,
          fullname: res[0].candidateProfile.fullname,
          gender: res[0].candidateProfile.gender,
          experience: res[0].candidateProfile.experience,
          expectedSalary: Number(res[0].candidateProfile.expectedSalaryNum),
          phoneNumber: res[0].candidateProfile.phoneNumber,
          mobileNumber: res[0].candidateProfile.mobileNumber,
          nik: res[0].candidateProfile.nik,
          birthDate: res[0].candidateProfile.birthDate,
          birthDateTemp: new Date(res[0].candidateProfile.birthDate),
          birthPlace: res[0].candidateProfile.birthPlace,
          maritalStatusCode: res[0].candidateProfile.maritalStatusCode,
          maritalStatusId: res[0].candidateProfile.maritalStatusId,
          religionCode: res[0].candidateProfile.religionCode,
          religionId: res[0].candidateProfile.religionId,
          personTypeCode: res[0].candidateProfile.personTypeCode,
          personTypeId: res[0].candidateProfile.personTypeId,
          fileId: res[0].candidateProfile.fileId,
          file: '',
          fileExtension: '',
          candidateStatusCode: res[0].candidateProfile.candidateStatusCode,
          candidateStatusId: res[0].candidateProfile.candidateStatusId
        }


      })
      this.candidateService.navbarObservable(res[0].candidateProfile.fileId)

      this.candidateAddresses = res[1]
      this.candidateEducations = res[2]
      this.candidateWorks = res[3]
      this.candidateTrainings = res[4]
      this.candidateProjects = res[5]
      this.candidateSkills = res[6]
      this.candidateLanguages = res[7]
      this.candidateFamilies = res[8]
      this.candidateReferences = res[9]
      this.candidateDocuments = res[10]
      this.religions = res[11]
      this.types = res[12]
      this.candidateStatus = res[13]
      this.maritals = res[14]
      this.fileTypes = res[15]


    })

    this.salutations = [
      { value: 'Mr.', label: 'Mr.' },
      { value: 'Mrs.', label: 'Mrs.' }
    ];

    this.genders = [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' }
    ];

    this.residenceType = [
      { value: 'Home', label: 'Home' },
      { value: 'Domicile', label: 'Domicile' }
    ]

    this.degrees = [
      { value: 'Sarjana (S1)', label: 'Sarjana (S1)' },
      { value: 'Magister (S2)', label: 'Magister (S2)' }
    ]

  }

  checkForm(form: FormGroup) {
    if (form.invalid) {
      return form.markAllAsTouched()
    }
  }

  candidateProfileInfo() {
    return this.candidateService.getById(this.candidateId)
      .subscribe((res) => {

        this.addressInsertReqDto.patchValue({
          candidateId: res.candidateUser.id,
          email: res.candidateUser.userEmail
        })

        this.educationInsertReqDto.patchValue({
          candidateId: res.candidateUser.id,
          email: res.candidateUser.userEmail
        })

        this.workingInsertReqDto.patchValue({
          candidateId: res.candidateUser.id,
          email: res.candidateUser.userEmail
        })

        this.trainingInsertReqDto.patchValue({
          email: res.candidateUser.userEmail
        })

        this.projectInsertReqDto.patchValue({
          candidateId: res.candidateUser.id,
          email: res.candidateUser.userEmail
        })

        this.skillInsertReqDto.patchValue({
          candidateId: res.candidateUser.id,
          email: res.candidateUser.userEmail
        })

        this.languageInsertReqDto.patchValue({
          email: res.candidateUser.userEmail
        })

        this.familyInsertReqDto.patchValue({
          email: res.candidateUser.userEmail
        })

        this.referenceInsertReqDto.patchValue({
          candidateEmail: res.candidateUser.userEmail
        })

        this.documentInsertReqDto.patchValue({
          candidateId: res.candidateUser.id,
          email: res.candidateUser.userEmail
        })
      })
  }

  showAddAddress() {
    this.base.all([
      this.candidateService.getById(this.candidateId)
    ])
      .then(res => {
        this.addressInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.educationInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.workingInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.trainingInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.projectInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.skillInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.languageInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.familyInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.referenceInsertReqDto.patchValue({
          candidateEmail: res[0].candidateUser.userEmail
        })

        this.documentInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })
      })

    this.dialogAddress = true;
  }

  showDeleteAddress(id: string) {
    this.addressId = id
    this.dialogDeleteAddress = true;
  }

  showAddEducation() {
    this.base.all([
      this.candidateService.getById(this.candidateId)
    ])
      .then(res => {
        this.addressInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.educationInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.workingInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.trainingInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.projectInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.skillInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.languageInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.familyInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.referenceInsertReqDto.patchValue({
          candidateEmail: res[0].candidateUser.userEmail
        })

        this.documentInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })
      })

    this.dialogEducation = true;
  }

  showDeleteEducation(id: string) {
    this.educationId = id
    this.dialogDeleteEducation = true
  }

  showAddFamily() {
    this.base.all([
      this.candidateService.getById(this.candidateId)
    ])
      .then(res => {
        this.addressInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.educationInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.workingInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.trainingInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.projectInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.skillInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.languageInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.familyInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.referenceInsertReqDto.patchValue({
          candidateEmail: res[0].candidateUser.userEmail
        })

        this.documentInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })
      })

    this.dialogFamily = true;
  }

  showDeleteFamily(id: string) {
    this.familyId = id
    this.dialogDeleteFamily = true
  }

  showAddSkill() {
    this.base.all([
      this.candidateService.getById(this.candidateId)
    ])
      .then(res => {
        this.addressInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.educationInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.workingInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.trainingInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.projectInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.skillInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.languageInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.familyInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.referenceInsertReqDto.patchValue({
          candidateEmail: res[0].candidateUser.userEmail
        })

        this.documentInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })
      })

    this.dialogSkill = true;
  }

  showDeleteSkill(id: string) {
    this.skillId = id
    this.dialogDeleteSkill = true
  }

  showAddLanguage() {
    this.base.all([
      this.candidateService.getById(this.candidateId)
    ])
      .then(res => {
        this.addressInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.educationInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.workingInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.trainingInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.projectInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.skillInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.languageInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.familyInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.referenceInsertReqDto.patchValue({
          candidateEmail: res[0].candidateUser.userEmail
        })

        this.documentInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })
      })

    this.dialogLanguage = true;
  }

  showDeleteLanguage(id: string) {
    this.languageId = id
    this.dialogDeleteLanguage = true
  }

  showAddReference() {
    this.base.all([
      this.candidateService.getById(this.candidateId)
    ])
      .then(res => {
        this.addressInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.educationInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.workingInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.trainingInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.projectInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.skillInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.languageInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.familyInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.referenceInsertReqDto.patchValue({
          candidateEmail: res[0].candidateUser.userEmail
        })

        this.documentInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })
      })

    this.dialogReference = true;
  }

  showDeleteReference(id: string) {
    this.referenceId = id
    this.dialogDeleteReference = true
  }

  showAddWorking() {
    this.base.all([
      this.candidateService.getById(this.candidateId)
    ])
      .then(res => {
        this.addressInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.educationInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.workingInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.trainingInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.projectInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.skillInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.languageInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.familyInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.referenceInsertReqDto.patchValue({
          candidateEmail: res[0].candidateUser.userEmail
        })

        this.documentInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })
      })

    this.dialogWorking = true;
  }

  showDeleteWorking(id: string) {
    this.workingId = id
    this.dialogDeleteWorking = true
  }

  showAddTraining() {
    this.base.all([
      this.candidateService.getById(this.candidateId),
    ])
      .then(res => {
        this.candidateUser = res[0]

        this.birthDateCandidate = new Date(res[0].candidateProfile.birthDate)
        console.log(this.birthDateCandidate);


        if (this.candidateUser?.candidateProfile?.fileId) {
          this.imageUrl = `${BASE_URL}/files/${this.candidateUser?.candidateProfile?.fileId}`
        } else {
          this.imageUrl = '../../../assets/emptyProfile.jpeg'
        }

        this.candidateUpdateInsertReqDto.patchValue({
          id: res[0].candidateUser.id,
          userEmail: res[0].candidateUser.userEmail,
          userPassword: res[0].candidateUser.userPassword,
          profile: {
            id: res[0].candidateProfile.id,
            salutation: res[0].candidateProfile.salutation,
            fullname: res[0].candidateProfile.fullname,
            gender: res[0].candidateProfile.gender,
            experience: res[0].candidateProfile.experience,
            expectedSalary: Number(res[0].candidateProfile.expectedSalaryNum),
            phoneNumber: res[0].candidateProfile.phoneNumber,
            mobileNumber: res[0].candidateProfile.mobileNumber,
            nik: res[0].candidateProfile.nik,
            birthDate: res[0].candidateProfile.birthDate,
            birthDateTemp: new Date(res[0].candidateProfile.birthDate),
            birthPlace: res[0].candidateProfile.birthPlace,
            maritalStatusCode: res[0].candidateProfile.maritalStatusCode,
            maritalStatusId: res[0].candidateProfile.maritalStatusId,
            religionCode: res[0].candidateProfile.religionCode,
            religionId: res[0].candidateProfile.religionId,
            personTypeCode: res[0].candidateProfile.personTypeCode,
            personTypeId: res[0].candidateProfile.personTypeId,
            fileId: res[0].candidateProfile.fileId,
            file: '',
            fileExtension: '',
            candidateStatusCode: res[0].candidateProfile.candidateStatusCode,
            candidateStatusId: res[0].candidateProfile.candidateStatusId
          }
        })

      })
    this.dialogTraining = true;
  }

  showDeleteTraining(id: string) {
    this.trainingId = id
    this.dialogDeleteTraining = true
  }

  showAddProject() {
    this.base.all([
      this.candidateService.getById(this.candidateId)
    ])
      .then(res => {
        this.addressInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.educationInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.workingInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.trainingInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.projectInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.skillInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.languageInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.familyInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.referenceInsertReqDto.patchValue({
          candidateEmail: res[0].candidateUser.userEmail
        })

        this.documentInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })
      })

    this.dialogProject = true;
  }

  showDeleteProject(id: string) {
    this.projectId = id
    this.dialogDeleteProject = true
  }

  showAddDocuments() {
    this.base.all([
      this.candidateService.getById(this.candidateId)
    ])
      .then(res => {
        this.addressInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.educationInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.workingInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.trainingInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.projectInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.skillInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })

        this.languageInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.familyInsertReqDto.patchValue({
          email: res[0].candidateUser.userEmail
        })

        this.referenceInsertReqDto.patchValue({
          candidateEmail: res[0].candidateUser.userEmail
        })

        this.documentInsertReqDto.patchValue({
          candidateId: res[0].candidateUser.id,
          email: res[0].candidateUser.userEmail
        })
      })

    this.dialogDocument = true;
  }

  showDeleteDocument(id: string) {
    this.documentId = id
    this.dialogDeleteDocument = true
  }

  onAddAddress() {
    if (this.addressInsertReqDto.valid) {
      const data = this.addressInsertReqDto.getRawValue()
      this.candidateAddressService.create(data).subscribe((res) => {
        this.addressInsertReqDto.reset()

        this.base.all([
          this.candidateAddressService.getByCandidate(this.candidateId)
        ]).then(res => {
          this.candidateAddresses = res[0]
        })


        this.dialogAddress = false
      })
    }
  }

  onAddEducation() {
    if (this.educationInsertReqDto.valid) {
      const data = this.educationInsertReqDto.getRawValue()
      this.candidateEducationService.create(data).subscribe((res) => {
        this.educationInsertReqDto.reset()

        this.base.all([
          this.candidateEducationService.getByCandidate(this.candidateId)
        ]).then(res => {
          this.candidateEducations = res[0]
        })

        this.dialogEducation = false
      })
    }
  }

  onAddWorking() {
    if (this.workingInsertReqDto.valid) {
      const data = this.workingInsertReqDto.getRawValue()
      this.candidateWorkExpService.create(data).subscribe((res) => {
        this.workingInsertReqDto.reset()

        this.base.all([
          this.candidateWorkExpService.getByCandidate(this.candidateId)
        ]).then(res => {
          this.candidateWorks = res[0]
        })

        this.dialogWorking = false
      })
    }
  }

  onAddTraining() {
    if (this.trainingInsertReqDto.valid) {
      const data = this.trainingInsertReqDto.getRawValue()
      this.candidateTrainingExpService.create(data).subscribe((res) => {
        this.trainingInsertReqDto.reset()

        this.base.all([
          this.candidateTrainingExpService.getByCandidate(this.candidateId)
        ]).then(res => {
          this.candidateTrainings = res[0]
        })

        this.dialogTraining = false
      })
    }
  }

  onAddProject() {
    if (this.projectInsertReqDto.valid) {
      const data = this.projectInsertReqDto.getRawValue()
      this.candidateProjectExpService.create(data).subscribe((res) => {
        this.projectInsertReqDto.reset()

        this.base.all([
          this.candidateProjectExpService.getByCandidate(this.candidateId)
        ]).then(res => {
          this.candidateProjects = res[0]
        })

        this.dialogProject = false
      })
    }
  }

  onAddSkill() {
    if (this.skillInsertReqDto.valid) {
      const data = this.skillInsertReqDto.getRawValue()
      this.candidateSkillService.create(data).subscribe((res) => {
        this.skillInsertReqDto.reset()

        this.base.all([
          this.candidateSkillService.getByCandidate(this.candidateId)
        ]).then(res => {
          this.candidateSkills = res[0]
        })

        this.dialogSkill = false
      })
    }
  }

  onAddLanguage() {
    if (this.languageInsertReqDto.valid) {
      const data = this.languageInsertReqDto.getRawValue()
      this.candidateLanguageService.create(data).subscribe((res) => {
        this.languageInsertReqDto.reset()

        this.base.all([
          this.candidateLanguageService.getByCandidate(this.candidateId)
        ]).then(res => {
          this.candidateLanguages = res[0]
        })

        this.dialogLanguage = false
      })
    }
  }

  onAddFamily() {
    if (this.familyInsertReqDto.valid) {
      const data = this.familyInsertReqDto.getRawValue()
      this.candidateFamilyService.create(data).subscribe((res) => {
        this.familyInsertReqDto.reset()

        this.base.all([
          this.candidateFamilyService.getByCandidate(this.candidateId)
        ]).then(res => {
          this.candidateFamilies = res[0]
        })


        this.dialogFamily = false
      })
    }
  }

  onAddReference() {
    if (this.referenceInsertReqDto.valid) {
      const data = this.referenceInsertReqDto.getRawValue()
      this.candidateReferenceService.create(data).subscribe((res) => {
        this.referenceInsertReqDto.reset()

        this.base.all([
          this.candidateReferenceService.getByCandidate(this.candidateId)
        ]).then(res => {
          this.candidateReferences = res[0]
        })

        this.dialogReference = false
      })
    }
  }

  onAddDocument() {
    if (this.documentInsertReqDto.valid) {
      const data = this.documentInsertReqDto.getRawValue()
      this.candidateDocumentService.create(data).subscribe((res) => {
        this.documentInsertReqDto.reset()

        this.base.all([
          this.candidateDocumentService.getByCandidate(this.candidateId)
        ]).then(res => {
          this.candidateDocuments = res[0]
        })

        this.dialogDocument = false
      })
    }
  }

  onDeleteAddress() {
    this.candidateAddressService.delete(this.addressId).subscribe((res) => {
      this.base.all([
        this.candidateAddressService.getByCandidate(this.candidateId)
      ]).then(res => {
        this.candidateAddresses = res[0]
      })
      this.dialogDeleteAddress = false
    })
  }

  onDeleteTraining() {
    this.candidateTrainingExpService.delete(this.trainingId).subscribe((res) => {
      this.base.all([
        this.candidateTrainingExpService.getByCandidate(this.candidateId)
      ]).then(res => {
        this.candidateTrainings = res[0]
      })
      this.dialogDeleteTraining = false
    })
  }

  onDeleteEducation() {
    this.candidateEducationService.delete(this.educationId).subscribe((res) => {
      this.base.all([
        this.candidateEducationService.getByCandidate(this.candidateId)
      ]).then(res => {
        this.candidateEducations = res[0]
      })
      this.dialogDeleteEducation = false
    })
  }

  onDeleteWorking() {
    this.candidateWorkExpService.delete(this.workingId).subscribe((res) => {
      this.base.all([
        this.candidateWorkExpService.getByCandidate(this.candidateId)
      ]).then(res => {
        this.candidateWorks = res[0]
      })
      this.dialogDeleteWorking = false
    })
  }

  onDeleteProject() {
    this.candidateProjectExpService.delete(this.projectId).subscribe((res) => {
      this.base.all([
        this.candidateProjectExpService.getByCandidate(this.candidateId)
      ]).then(res => {
        this.candidateProjects = res[0]
      })

      this.dialogDeleteProject = false
    })
  }

  onDeleteSkill() {
    this.candidateSkillService.delete(this.skillId).subscribe((res) => {
      this.base.all([
        this.candidateSkillService.getByCandidate(this.candidateId)
      ]).then(res => {
        this.candidateSkills = res[0]
      })
      this.dialogDeleteSkill = false
    })
  }

  onDeleteLanguage() {
    this.candidateLanguageService.delete(this.languageId).subscribe((res) => {
      this.base.all([
        this.candidateLanguageService.getByCandidate(this.candidateId)
      ]).then(res => {
        this.candidateLanguages = res[0]
      })
      this.dialogDeleteLanguage = false
    })
  }

  onDeleteFamily() {
    this.candidateFamilyService.delete(this.familyId).subscribe((res) => {
      this.base.all([
        this.candidateFamilyService.getByCandidate(this.candidateId)
      ]).then(res => {
        this.candidateFamilies = res[0]
      })
      this.dialogDeleteFamily = false
    })
  }

  onDeleteReference() {
    this.candidateReferenceService.delete(this.referenceId).subscribe((res) => {
      this.base.all([
        this.candidateReferenceService.getByCandidate(this.candidateId)
      ]).then(res => {
        this.candidateReferences = res[0]
      })

      this.dialogDeleteReference = false
    })
  }

  onDeleteDocument() {
    this.candidateDocumentService.delete(this.documentId).subscribe((res) => {
      this.base.all([
        this.candidateDocumentService.getByCandidate(this.candidateId)
      ]).then(res => {
        this.candidateDocuments = res[0]
      })
      this.dialogDeleteDocument = false
    })
  }

  onUpdate() {
    if (this.candidateUpdateInsertReqDto.valid) {
      const data = this.candidateUpdateInsertReqDto.getRawValue()
      this.candidateService.update(data).subscribe((res) => {
        this.router.navigateByUrl(`/candidates/profile`)
      })

    }
  }

  get profile() {
    return this.candidateUpdateInsertReqDto.get('profile') as FormGroup
  }

  fileUpload(event: any, fileUpload: FileUpload) {
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
      };
      reader.onerror = error => reject(error);
    });

    for (let file of event.files) {
      toBase64(file).then(result => {
        const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
        const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

        this.profile.patchValue({
          file: resultBase64,
          fileExtension: resultExtension
        })

        fileUpload.clear()
      })
    }
  }

  fileUploadDoc(event: any, fileUpload: FileUpload) {
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
      };
      reader.onerror = error => reject(error);
    });

    for (let file of event.files) {
      toBase64(file).then(result => {
        const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
        const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

        this.documentInsertReqDto.patchValue({
          fileName: resultBase64,
          fileExtension: resultExtension
        })

        fileUpload.clear()
      })
    }
  }
}

const convertUTCToLocalDate = function (date: Date) {
  const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  return newDate.toISOString().split('T')[0]
}

