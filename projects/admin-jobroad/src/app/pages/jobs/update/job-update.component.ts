import { Component, OnInit } from "@angular/core";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { JobService } from "../../../service/job.service";
import { first, firstValueFrom } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { CompanyService } from "../../../service/company.service";
import { QuestionService } from "../../../service/question.service";
import { BenefitService } from "../../../service/benefit.service";
import { UserService } from "../../../service/user.service";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { BenefitResDto } from "../../../dto/benefit/benefit.res.dto";
import { QuestionResDto } from "../../../dto/question/question.res.dto";
import { UserResDto } from "../../../dto/user/user.res.dto";
import { RoleCodeEnum } from "../../../constant/user-role.constant";
import { EmploymentTypeService } from "../../../service/employment-type.service";
import { EmployementTypeResDto } from "../../../dto/employement-type/employement-type.res.dto";
import { FileUpload } from "primeng/fileupload";
import { AssignedJobQuestionResDto } from "../../../dto/assigned-job-question/assigned-job-question.res.dto";
import { AssignedQuestionService } from "../../../service/assigned-job.service";

@Component({
    selector: 'job-update',
    templateUrl: './job-update.component.html'
})
export class JobUpdateComponent implements OnInit {
    job!: JobResDto;
    loading = false;
    company!: CompanyResDto[];
    benefits!: BenefitResDto[];
    question! : QuestionResDto;
    jobBenefit! : BenefitResDto[];
    questions!: QuestionResDto[];
    hr!: UserResDto[];
    pic!: UserResDto[];
    assignedJob! : AssignedJobQuestionResDto[];
    employmentTypes! : EmployementTypeResDto[];
    jobUpdateReqDto = this.fb.group({
        id: ['', Validators.required],
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
        file: [''],
        fileExtension: ['']
    });
    constructor(
        private jobService: JobService,
        private activated: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private companyService: CompanyService,
        private questionService: QuestionService,
        private benefitService: BenefitService,
        private userService: UserService,
        private employmentTypeService : EmploymentTypeService,
        private router : Router,
        private assignedJobService : AssignedQuestionService) { }
    ngOnInit(): void {
        firstValueFrom(this.activated.params).then(result => {
            firstValueFrom(this.jobService.getByDetail(result['id'])).then(result => {
                this.job = result;
                console.log("Jobss  ====    ",this.job)
                console.log("Uang ===   ",Number(this.job.expectedSalaryMin.replace(/[^0-9.-]+/g,""))* 1000) 
                console.log("Uang baru ==  ",Number(this.job.expectedSalaryMin.replace(/[Rp.-]+/g,"")));
                
                this.jobUpdateReqDto.patchValue({
                    id: this.job.id,
                    jobName: this.job.jobName,
                    companyId : this.job.companyId,
                    startDateTemp: new Date(this.job.startDate),
                    endDateTemp: new Date(this.job.endDate),
                    description: this.job.description,
                    hrId: this.job.hrId,
                    picId: this.job.picId,
                    expectedSalaryMin: Number(convert2(this.job.expectedSalaryMin)),
                    expectedSalaryMax: Number(convert2(this.job.expectedSalaryMax)),
                    employmentTypeId : this.job.employmentTypeId
                })
                firstValueFrom(this.benefitService.getByJob(result['id'])).then(result => {
                  this.jobBenefit = result;
                  for(let i = 0 ; i < this.jobBenefit.length ; i++){
                    this.benefitsId.push(this.fb.group({ benefitId: [this.jobBenefit[i].id, Validators.required] }));
                  }
                })
            })
            firstValueFrom(this.assignedJobService.getByJob(result['id'])).then(result =>{
              this.assignedJob = result
              console.log('Assigned Job =  ',this.assignedJob)
              for(let i = 0 ; i < this.assignedJob.length ; i++){
                firstValueFrom(this.questionService.getById(this.assignedJob[i].questionId)).then(result =>{
                  this.question = result;
                  this.questionsId.push(this.fb.group({ questionId: [this.question.id] }));
                })

              }
            })
           
        })
        firstValueFrom(this.companyService.getAll()).then(result => {
            this.company = result
        })
        firstValueFrom(this.questionService.getAll()).then(result => {
            this.questions = result
        })
        firstValueFrom(this.benefitService.getAll()).then(result => {
            this.benefits = result
        })
        firstValueFrom(this.userService.getByRole(RoleCodeEnum.HR)).then(result => {
            this.hr = result;
        })
        firstValueFrom(this.userService.getByRole(RoleCodeEnum.PIC)).then(result => {
            this.pic = result;
        })
        firstValueFrom(this.employmentTypeService.getAll()).then(result =>{
            this.employmentTypes = result;
        })
        this.jobUpdateReqDto.get('startDateTemp')?.valueChanges.subscribe(res => {
          const newStartDate = convertUTCToLocalDate(res as any)
          this.jobUpdateReqDto.get('startDate')?.setValue(newStartDate)
        })
    
        this.jobUpdateReqDto.get('endDateTemp')?.valueChanges.subscribe(res => {
          const newEndDate = convertUTCToLocalDate(res as any)
          this.jobUpdateReqDto.get('endDate')?.setValue(newEndDate)
        })
    }

    checkForm(form: FormGroup) {
        if (form.invalid) {
          return form.markAllAsTouched()
        }
      }
    
      get benefitsId() {
        return this.jobUpdateReqDto.get(`benefits`) as FormArray;
      }
      get questionsId() {
        return this.jobUpdateReqDto.get(`questions`) as FormArray;
      }
      addBenefit() {
        this.benefitsId.push(this.fb.group({ benefitId: ['', Validators.required] }));
      }
      addQuestion() {
        this.questionsId.push(this.fb.group({ questionId: [''] }));
      }
      onSubmit() {
        const data = this.jobUpdateReqDto.getRawValue();
        this.loading = true
        if (this.jobUpdateReqDto.valid) {
          firstValueFrom(this.jobService.update(data)).then(() => {
            this.router.navigateByUrl('/jobs')
            this.loading = false
          }).catch(()=>{
            this.loading = false
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
    
            this.jobUpdateReqDto.patchValue({
              file: resultBase64,
              fileExtension: resultExtension
            })
            fileUpload.clear();
          })
        }
      }
}
const convertUTCToLocalDate = function (date: Date) {
  const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  return newDate.toISOString().split('T')[0]
}

function convert(currency : string) {
  let k, temp='';

  // Loop to make substring
  for (let i = 0; i < currency.length; i++) {
      // Getting Unicode value
      k = currency.charCodeAt(i);

      // Checking whether the character
      // is of numeric type or not
      if (k > 47 && k < 58) {
          // Making substring
          temp = currency.substring(i);
          break;
      }
  }

  // If currency is in format like
  // 458, 656.75 then we used replace
  // method to replace every ', ' with ''
  temp = temp.replace(/, /, "");

  // Converting string to float
  // or double and return
  return parseFloat(temp);
}

function convert2(currency : string) {
     
  // Using replace() method
  // to make currency string suitable
  // for parseFloat() to convert
  let temp = currency.replace(/[Rp.-]+/g,"");

  // Converting string to float
  // or double and return
  return parseFloat(temp).toFixed(2);
}