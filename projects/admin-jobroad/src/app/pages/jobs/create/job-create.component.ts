import { Component, OnDestroy, OnInit } from "@angular/core";
import { JobService } from "../../../service/job.service";
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../../service/user.service";
import { EmploymentTypeService } from "../../../service/employment-type.service";
import { UserResDto } from "../../../dto/user/user.res.dto";
import { EmployeeResDto } from "../../../dto/employee/employee.res.dto";
import { EmployementTypeResDto } from "../../../dto/employement-type/employement-type.res.dto";
import { CompanyService } from "../../../service/company.service";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { BenefitResDto } from "../../../dto/benefit/benefit.res.dto";
import { QuestionResDto } from "../../../dto/question/question.res.dto";
import { BenefitService } from "../../../service/benefit.service";
import { QuestionService } from "../../../service/question.service";
import { FileUpload } from "primeng/fileupload";
import { RoleCodeEnum } from "../../../constant/user-role.constant";
import { Subscription, firstValueFrom } from "rxjs";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit, OnDestroy {
  loading = false
  jobReqDto = this.fb.group({
    jobName: ['', Validators.required],
    companyId: ['', Validators.required],
    startDate: ['', Validators.required],
    startDateTemp: new FormControl<Date | null>(null),
    endDate: ['', Validators.required],
    endDateTemp: new FormControl<Date | null>(null),
    description: ['', Validators.required],
    hrId: ['', Validators.required],
    picId: ['', Validators.required],
    expectedSalaryMin: new FormControl<number | null>(null, Validators.required),
    expectedSalaryMax: new FormControl<number | null>(null, Validators.required),
    employmentTypeId: ['', Validators.required],
    benefits: this.fb.array([]),
    questions: this.fb.array([]),
    file: ['', Validators.required],
    fileExtension: ['', Validators.required]
  });
  hr!: UserResDto[];
  hrSubscription!: Subscription;
  pic!: UserResDto[];
  picSubscription!: Subscription;
  company!: CompanyResDto[];
  companySubscription!: Subscription;
  employmentType!: EmployementTypeResDto[];
  employmentTypeSubscription!: Subscription;
  benefit!: BenefitResDto[];
  benefitSubscription!: Subscription;
  question!: QuestionResDto[];
  questionSubscription!: Subscription;

  constructor(private jobService: JobService, private fb: NonNullableFormBuilder,
    private router: Router, private userService: UserService, private employmentTypeService: EmploymentTypeService,
    private companyService: CompanyService, private benefitService: BenefitService,
    private questionService: QuestionService,
    private title: Title) {
    this.title.setTitle("Create New Job")
  }

  ngOnInit(): void {

    this.jobReqDto.get('startDateTemp')?.valueChanges.subscribe(res => {
      const newStartDate = convertUTCToLocalDate(res as any)
      this.jobReqDto.get('startDate')?.setValue(newStartDate)
    })

    this.jobReqDto.get('endDateTemp')?.valueChanges.subscribe(res => {
      const newEndDate = convertUTCToLocalDate(res as any)
      this.jobReqDto.get('endDate')?.setValue(newEndDate)
    })


    this.hrSubscription = this.userService.getByRole(RoleCodeEnum.HR).subscribe(result => {
      this.hr = result;
    })
    this.picSubscription = this.userService.getByRole(RoleCodeEnum.PIC).subscribe(result => {
      this.pic = result;
    })
    this.employmentTypeSubscription = this.employmentTypeService.getAll().subscribe(result => {
      this.employmentType = result;
    })
    this.companySubscription = this.companyService.getAll().subscribe(result => {
      this.company = result;
    })
    this.benefitSubscription = this.benefitService.getAll().subscribe(result => {
      this.benefit = result;
    })
    this.questionSubscription = this.questionService.getAll().subscribe(result => {
      this.question = result;
    })


  }

  checkForm(form: FormGroup) {
    if (form.invalid) {
      return form.markAllAsTouched()
    }
  }

  get benefitsId() {
    return this.jobReqDto.get(`benefits`) as FormArray;
  }
  get questionsId() {
    return this.jobReqDto.get(`questions`) as FormArray;
  }
  addBenefit() {
    this.benefitsId.push(this.fb.group({ benefitId: ['', Validators.required] }));
  }
  addQuestion() {
    this.questionsId.push(this.fb.group({ questionId: [''] }));
  }
  onSubmit() {
    const data = this.jobReqDto.getRawValue();

    if (this.jobReqDto.valid) {
      firstValueFrom(this.jobService.create(data)).then(() => {
        this.router.navigateByUrl('/jobs')
      });

    }

  }

  removeBenefit(i: number) {
    this.benefitsId.removeAt(i);
  }
  removeQuestion(q: number) {
    this.questionsId.removeAt(q);
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

        this.jobReqDto.patchValue({
          file: resultBase64,
          fileExtension: resultExtension
        })
        fileUpload.clear();
      })
    }
  }
  ngOnDestroy(): void {
    this.hrSubscription.unsubscribe();
    this.picSubscription.unsubscribe();
    this.employmentTypeSubscription.unsubscribe();
    this.companySubscription.unsubscribe();
    this.benefitSubscription.unsubscribe();
    this.questionSubscription.unsubscribe();
  }
}

const convertUTCToLocalDate = function (date: Date) {
  const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  return newDate.toISOString().split('T')[0]
}

