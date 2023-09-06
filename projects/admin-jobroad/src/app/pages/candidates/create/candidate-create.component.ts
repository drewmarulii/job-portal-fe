import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CandidateTrainingInsertReqDto } from "../../../dto/candidate-training/candidate-training-insert.req.dto";
import { FileUpload } from "primeng/fileupload";
import { CandidateAddressInsertReqDto } from "../../../dto/candidate-address/candidate-address-insert.req.dto";
import { CandidateEducationInsertReqDto } from "../../../dto/candidate-education/candidate-education-insert.req.dto";
import { CandidateWorkInsertReqDto } from "../../../dto/candidate-work/candidate-work-insert.req.dto";
import { CandidateProjectInsertReqDto } from "../../../dto/candidate-project/candidate-project-insert.req.dto";
import { CandidateSkillInsertReqDto } from "../../../dto/candidate-skill/candidate-skill-insert.req.dto";
import { CandidateLanguageInsertReqDto } from "../../../dto/candidate-language/candidate-language-insert.req.dto";
import { CandidateFamilyInsertReqDto } from "../../../dto/candidate-family/candidate-family-insert.req.dto";
import { CandidateReferencesInsertReqDto } from "../../../dto/candidate-references/candidate-references-insert.req.dto";
import { ReligionService } from "../../../service/religion.service";
import { ReligionResDto } from "../../../dto/religion/religion.res.dto";
import { PersonTypeService } from "../../../service/person-type.service";
import { PersonTypeResDto } from "../../../dto/person-type/person-type.res.dto";
import { CandidateStatusService } from "../../../service/candidate-status.service";
import { CandidateStatusResDto } from "../../../dto/candidate-status/candidate-status.res.dto";
import { MaritalStatusService } from "../../../service/maritalstatus.service";
import { MaritalResDto } from "../../../dto/marital/marital.res.dto";
import { CandidateUserService } from "../../../service/candidate-user.service";
import { CandidateDocumentInsertReqDto } from "../../../dto/candidate-document/candidate-document-insert.req.dto";
import { FileTypeService } from "../../../service/file-type.service";
import { FileTypeResDto } from "../../../dto/file-type/file-type.res.dto";
import { firstValueFrom } from "rxjs";
import { Title } from "@angular/platform-browser";

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
  selector: 'candidate-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.css']
})
export class CandidateCreateComponent implements OnInit {
  loading = false
  imgUrl!: string
  salaryValue: number = 0
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
  trainings: CandidateTrainingInsertReqDto[] = []
  addresses: CandidateAddressInsertReqDto[] = []
  educations: CandidateEducationInsertReqDto[] = []
  workings: CandidateWorkInsertReqDto[] = []
  projects: CandidateProjectInsertReqDto[] = []
  skills: CandidateSkillInsertReqDto[] = []
  languages: CandidateLanguageInsertReqDto[] = []
  families: CandidateFamilyInsertReqDto[] = []
  references: CandidateReferencesInsertReqDto[] = []
  documents: CandidateDocumentInsertReqDto[] = []
  degrees: Degree[] | undefined
  salutations: Salutation[] | undefined
  genders: Gender[] | undefined
  residenceType: ResidenceType[] | undefined
  maritals!: MaritalResDto[]
  religions!: ReligionResDto[]
  types!: PersonTypeResDto[]
  candidateStatus!: CandidateStatusResDto[]
  fileTypes!: FileTypeResDto[]

  constructor(
    private candidateService: CandidateUserService,
    private religionService: ReligionService,

    private personTypeService: PersonTypeService,
    private candidateStatusService: CandidateStatusService,
    private maritalStatusService: MaritalStatusService,
    private fileTypeService: FileTypeService,

    private fb: NonNullableFormBuilder,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle("Create New Candidate")
  }

  candidateMasterInsertReqDto = this.fb.group({
    userEmail: ['', Validators.required],
    salutation: ['', Validators.required],
    fullname: ['', Validators.required],
    gender: ['', Validators.required],
    experience: ['', Validators.required],
    expectedSalary: new FormControl<number | null>(null, Validators.required),
    phoneNumber: ['', Validators.required],
    mobileNumber: ['', Validators.required],
    nik: ['', Validators.required],
    birthDate: ['', Validators.required],
    birthDateTemp: new FormControl<Date | null>(null),
    birthPlace: ['', Validators.required],
    maritalStatusId: ['', Validators.required],
    religionId: ['', Validators.required],
    file: ['', Validators.required],
    fileExtension: ['', Validators.required],
    candidateAddress: this.fb.array(this.addresses),
    candidateDocuments: this.fb.array(this.documents),
    candidateEducations: this.fb.array(this.educations),
    candidateFamily: this.fb.array(this.families),
    candidateLanguage: this.fb.array(this.languages),
    candidateProjectExp: this.fb.array(this.projects),
    candidateReferences: this.fb.array(this.references),
    candidateSkill: this.fb.array(this.skills),
    candidateTrainingExp: this.fb.array(this.trainings),
    candidateWorkExp: this.fb.array(this.workings),
  })

  trainingInsertReqDto = this.fb.group({
    organizationName: ['', [Validators.required]],
    trainingName: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    startDateTemp: new FormControl<Date | null>(null),
    endDate: ['', [Validators.required]],
    endDateTemp: new FormControl<Date | null>(null)
  })

  addressInsertReqDto = this.fb.group({
    address: ['', [Validators.required]],
    residenceType: ['', [Validators.required]],
    country: ['', [Validators.required]],
    province: ['', [Validators.required]],
    city: ['', [Validators.required]],
    postalCode: ['', [Validators.required]]
  })

  educationInsertReqDto = this.fb.group({
    degreeName: ['', [Validators.required]],
    instituitionName: ['', [Validators.required]],
    majors: ['', [Validators.required]],
    cgpa: new FormControl<number | null>(null, Validators.required),
    startYear: ['', [Validators.required]],
    startYearTemp: new FormControl<Date | null>(null),
    endYear: ['', [Validators.required]],
    endYearTemp: new FormControl<Date | null>(null)

  })

  workingInsertReqDto = this.fb.group({
    positionName: ['', [Validators.required]],
    companyName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    responsibility: ['', [Validators.required]],
    reasonLeave: ['', [Validators.required]],
    lastSalary: new FormControl<number | null>(null, Validators.required),
    startDate: ['', [Validators.required]],
    startDateTemp: new FormControl<Date | null>(null),
    endDate: ['', [Validators.required]],
    endDateTemp: new FormControl<Date | null>(null)
  })

  projectInsertReqDto = this.fb.group({
    projectName: ['', [Validators.required]],
    projectUrl: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    startDateTemp: new FormControl<Date | null>(null),
    endDate: ['', [Validators.required]],
    endDateTemp: new FormControl<Date | null>(null),
  })

  skillInsertReqDto = this.fb.group({
    skillName: ['', [Validators.required]]
  })

  languageInsertReqDto = this.fb.group({
    languageName: ['', [Validators.required]],
    writingRate: ['', [Validators.required]],
    speakingRate: ['', [Validators.required]],
    listeningRate: ['', [Validators.required]]
  })

  familyInsertReqDto = this.fb.group({
    fullname: ['', [Validators.required]],
    relationship: ['', [Validators.required]],
    degreeName: ['', [Validators.required]],
    occupation: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
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
    description: ['', [Validators.required]]
  })

  documentInsertReqDto = this.fb.group({
    docName: ['', [Validators.required]],
    fileTypeCode: ['', [Validators.required]],
    fileName: ['', [Validators.required]],
    fileExtension: ['', [Validators.required]]
  })

  ngOnInit(): void {

    this.imgUrl = '../../../assets/emptyProfile.jpeg'

    this.candidateMasterInsertReqDto.get('birthDateTemp')?.valueChanges.subscribe(res => {
      const newBirthDate = convertUTCToLocalDate(res as any)
      this.candidateMasterInsertReqDto.get('birthDate')?.setValue(newBirthDate)
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


    firstValueFrom(this.religionService.getAll()).then((res) => {
      this.religions = res
    })

    firstValueFrom(this.personTypeService.getAll()).then((res) => {
      this.types = res
    })

    firstValueFrom(this.candidateStatusService.getAll()).then((res) => {
      this.candidateStatus = res
    })

    firstValueFrom(this.maritalStatusService.getAll()).then((res) => {
      this.maritals = res
    })

    firstValueFrom(this.fileTypeService.getAll()).then((res) => {
      this.fileTypes = res
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

  checkForm(form:FormGroup){
    if(form.invalid){
      form.markAllAsTouched()
    }
  }

  showAddAddress() {
    this.dialogAddress = true;
  }

  showAddEducation() {
    this.dialogEducation = true;
  }

  showAddFamily() {
    this.dialogFamily = true;
  }

  showAddSkill() {
    this.dialogSkill = true;
  }

  showAddLanguage() {
    this.dialogLanguage = true;
  }

  showAddReference() {
    this.dialogReference = true;
  }

  showAddWorking() {
    this.dialogWorking = true;
  }

  showAddTraining() {
    this.dialogTraining = true;
  }

  showAddProject() {
    this.dialogProject = true;
  }

  showAddDocuments() {
    this.dialogDocument = true;
  }

  onSubmit() {
    if (this.candidateMasterInsertReqDto.valid) {
      const data = this.candidateMasterInsertReqDto.getRawValue()
      firstValueFrom(this.candidateService.register(data)).then((res) => {
        this.router.navigateByUrl('/candidates')
      })
    }
  }

  get candidateAddress() {
    return this.candidateMasterInsertReqDto.get('candidateAddress') as FormArray
  }

  onAddAddress() {
    if (this.addressInsertReqDto.valid) {
      const data = this.addressInsertReqDto.getRawValue()
      this.candidateAddress.push(this.fb.group(data))
      this.addressInsertReqDto.reset()
      this.dialogAddress = false
    }
  }

  onDeleteAddress(i: number) {
    this.candidateAddress.removeAt(i)
  }

  get candidateTrainingExp() {
    return this.candidateMasterInsertReqDto.get('candidateTrainingExp') as FormArray
  }

  onAddTraining() {
    if (this.trainingInsertReqDto.valid) {
      const data = this.trainingInsertReqDto.getRawValue()

      this.candidateTrainingExp.push(this.fb.group(data))
      this.trainingInsertReqDto.reset()
      this.dialogTraining = false
    }
  }

  onDeleteTraining(i: number) {
    this.candidateTrainingExp.removeAt(i)
  }

  get candidateEducations() {
    return this.candidateMasterInsertReqDto.get('candidateEducations') as FormArray
  }

  onAddEducation() {
    if (this.educationInsertReqDto.valid) {
      const data = this.educationInsertReqDto.getRawValue()

      this.candidateEducations.push(this.fb.group(data))
      this.educationInsertReqDto.reset()
      this.dialogEducation = false
    }
  }

  onDeleteEducation(i: number) {
    this.candidateEducations.removeAt(i)
  }

  get candidateWorkExp() {
    return this.candidateMasterInsertReqDto.get('candidateWorkExp') as FormArray
  }

  onAddWorking() {
    if (this.workingInsertReqDto.valid) {
      const data = this.workingInsertReqDto.getRawValue()

      this.candidateWorkExp.push(this.fb.group(data))
      this.workingInsertReqDto.reset()
      this.dialogWorking = false
    }
  }

  onDeleteWorking(i: number) {
    this.candidateWorkExp.removeAt(i)
  }

  get candidateProjectExp() {
    return this.candidateMasterInsertReqDto.get('candidateProjectExp') as FormArray
  }

  onAddProject() {
    if (this.projectInsertReqDto.valid) {
      const data = this.projectInsertReqDto.getRawValue()

      this.candidateProjectExp.push(this.fb.group(data))
      this.projectInsertReqDto.reset()
      this.dialogProject = false
    }
  }

  onDeleteProject(i: number) {
    this.candidateProjectExp.removeAt(i)
  }

  get candidateSkill() {
    return this.candidateMasterInsertReqDto.get('candidateSkill') as FormArray
  }

  onAddSkill() {
    if (this.skillInsertReqDto.valid) {
      const data = this.skillInsertReqDto.getRawValue()

      this.candidateSkill.push(this.fb.group(data))
      this.skillInsertReqDto.reset()
      this.dialogSkill = false
    }
  }

  onDeleteSkill(i: number) {
    this.candidateSkill.removeAt(i)
  }

  get candidateLanguage() {
    return this.candidateMasterInsertReqDto.get('candidateLanguage') as FormArray
  }

  onAddLanguage() {
    if (this.languageInsertReqDto.valid) {
      const data = this.languageInsertReqDto.getRawValue()

      this.candidateLanguage.push(this.fb.group(data))
      this.languageInsertReqDto.reset()
      this.dialogLanguage = false
    }
  }

  onDeleteLanguage(i: number) {
    this.candidateLanguage.removeAt(i)
  }

  get candidateFamily() {
    return this.candidateMasterInsertReqDto.get('candidateFamily') as FormArray
  }

  onAddFamily() {
    if (this.familyInsertReqDto.valid) {
      const data = this.familyInsertReqDto.getRawValue()

      this.candidateFamily.push(this.fb.group(data))
      this.familyInsertReqDto.reset()
      this.dialogFamily = false
    }
  }

  onDeleteFamily(i: number) {
    this.candidateFamily.removeAt(i)
  }

  get candidateReferences() {
    return this.candidateMasterInsertReqDto.get('candidateReferences') as FormArray
  }

  onAddReference() {
    if (this.referenceInsertReqDto.valid) {
      const data = this.referenceInsertReqDto.getRawValue()

      this.candidateReferences.push(this.fb.group(data))
      this.referenceInsertReqDto.reset()
      this.dialogReference = false
    }
  }

  onDeleteReference(i: number) {
    this.candidateReferences.removeAt(i)
  }

  get candidateDocuments() {
    return this.candidateMasterInsertReqDto.get('candidateDocuments') as FormArray
  }

  onAddDocument() {
    if (this.documentInsertReqDto.valid) {
      const data = this.documentInsertReqDto.getRawValue()
      this.candidateDocuments.push(this.fb.group(data))
      this.documentInsertReqDto.reset()
      this.dialogDocument = false
    }
  }

  onDeleteDocument(i: number) {
    this.candidateDocuments.removeAt(i)
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

        this.candidateMasterInsertReqDto.patchValue({
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
