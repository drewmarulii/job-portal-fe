import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable, Subscription, firstValueFrom } from "rxjs";
import { MenuItem, MessageService } from "primeng/api";
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { AssesmentService } from "../../../service/assesment.service";
import { ApplicantResDto } from "../../../dto/applicant/applicant.res.dto";
import { AssementResDto } from "../../../dto/assessment/assement.res.dto";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { JobService } from "../../../service/job.service";
import { UserService } from "../../../service/user.service";
import { UserResDto } from "../../../dto/user/user.res.dto";
import { ApplicantService } from "../../../service/applicant.service";
import { InterviewService } from "../../../service/interview.service";
import { McuService } from "../../../service/mcu.service";
import { OfferingService } from "../../../service/offering.service";
import { HiredService } from "../../../service/hired.service";
import { InterviewResDto } from "../../../dto/interview/interviewe.res.dto";
import { ReviewResDto } from "../../../dto/review/review.res.dto";
import { ReviewService } from "../../../service/review.service";
import { McuResDto } from "../../../dto/mcu/mcu.res.dto";
import { HiringStatusEnum } from "../../../constant/hiring-status.constant";
import { employmentTypeEnum } from "../../../constant/employment-type.constant";
import { AuthService } from "../../../service/auth.service";
import { RoleCodeEnum } from "../../../constant/user-role.constant";


@Component({
    selector: 'applicant-detail',
    templateUrl: './applicant-detail.component.html',
    styleUrls: ['./applicant-detail.component.css']
})
export class ApplicantDetailComponent implements OnInit {
    jobId!: string;
    appId!: string;
    isOwner!: Boolean
    status!: MenuItem[];
    dropMenu = ['Applied', 'Assesment', 'Interview User', 'MCU', 'Offering']
    activeIndex: number = 0;
    intern = employmentTypeEnum.INTERN;
    contract = employmentTypeEnum.CONTRACT;
    personId!: string

    //Step
    applyStep = true;
    assesmentStep = true;
    interviewStep = true;
    mcuStep = true;
    offeringStep = true;
    hiringStep = true;

    //Master Data
    applicant?: ApplicantResDto;
    job!: JobResDto;
    pic?: UserResDto;

    //Transaction Data
    assesmentData?: AssementResDto;
    interviewData?: InterviewResDto;
    reviewData?: ReviewResDto;
    mcuDatas!: McuResDto[];


    assesmentForm = false;
    assesmentNoteForm = false;
    interviewForm = false;
    interviewNoteForm = false;
    mcuForm = false;
    offeringForm = false;
    hiringForm = false;
    loading = false;

    constructor(private router: Router,
        private activated: ActivatedRoute,
        private messageService: MessageService,
        private fb: NonNullableFormBuilder,
        private assesmentService: AssesmentService,
        private jobService: JobService,
        private userService: UserService,
        private applicantService: ApplicantService,
        private interviewService: InterviewService,
        private mcuService: McuService,
        private offeringService: OfferingService,
        private hiredService: HiredService,
        private reviewService: ReviewService,
        private authService: AuthService,

    ) {

    }

    applicantReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        applicantCode: ['', Validators.required],
        statusId: ['', Validators.required],
        statusCode: ['', Validators.required]
    })

    assesmentReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        assesmentLocation: ['', Validators.required],
        assesmentDate: ['', Validators.required],
        assesmentDateTemp: new FormControl<Date | null>(null)
    })
    assesmentNotesReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        notes: ['', Validators.required]
    })

    interviewReqDto = this.fb.group({
        applicantId: [null, Validators.required],
        applicantCode: [null],
        statusCode: [null],
        interviewDate: ['', Validators.required],
        interviewDateTemp: new FormControl<Date | null>(null),
        interviewLocation: [null, Validators.required]
    })
    reviewReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        notes: ['', Validators.required]
    })

    mcuReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        applicantCode: ['', Validators.required],
        statusCode: ['', Validators.required],
        mcuData: this.fb.array([])
    })

    offeringReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        applicantCode: ['', Validators.required],
        statusCode: ['', Validators.required],
        address: ['', Validators.required],
        salary: [0, Validators.required]
    })

    hiringReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        applicantCode: [''],
        statusId: [''],
        statusCode: [''],
        startDate: ['', Validators.required],
        startDateTemp: new FormControl<Date | null>(null),
        endDate: [null]
    })



    onActiveIndexChange(event: number) {
        this.activeIndex = event;
        this.stepperMenu();
        if (this.activeIndex == 1) {
            this.assesmentStep = !this.assesmentStep
            this.getAssesmentData();
        } else if (this.activeIndex == 2) {
            this.interviewStep = !this.interviewStep;
            this.InterviewData();
            this.getReviewData();
        } else if (this.activeIndex == 3) {
            this.interviewStep = false;
            this.mcuStep = false;
            this.getMcuData();
        }


    }


    ngOnInit(): void {
        const data = this.authService.getProfile()
        if (data) {
            this.personId = data.userId
        }

        this.assesmentReqDto.get('assesmentDateTemp')?.valueChanges.subscribe(res => {
            const restemp = res as any
            if (restemp instanceof Date) {
                const newDate = convertUTCToLocalDateTimeISO(res as any)
                this.assesmentReqDto.get('assesmentDate')?.setValue(newDate)
            }
        })

        this.interviewReqDto.get('interviewDateTemp')?.valueChanges.subscribe(res => {
            const restemp = res as any
            if (restemp instanceof Date) {
                const newDate = convertUTCToLocalDateTimeISO(res as any)
                this.interviewReqDto.get('interviewDate')?.setValue(newDate)
            }
        })

        this.hiringReqDto.get('startDateTemp')?.valueChanges.subscribe(res => {
            const restemp = res as any
            if (restemp instanceof Date) {
                const newDate = convertUTCToLocalDate(res as any)
                this.hiringReqDto.get('startDate')?.setValue(newDate)
            }
        })

        firstValueFrom(getParams(this.activated, 0)).then(params => {
            this.jobId = params['jobId'];
            this.appId = params['applicantId'];
            this.assesmentReqDto.patchValue({
                applicantId: params['applicantId']
            })
            this.interviewReqDto.patchValue({
                applicantId: params['applicantId']
            })
            firstValueFrom(this.applicantService.getById(params['applicantId'])).then(result => {
                this.applicant = result;
                if (this.applicant.statusCode == HiringStatusEnum.APPLIED) {
                    this.activeIndex = 0
                } else if (this.applicant.statusCode == HiringStatusEnum.ASSESMENT) {
                    this.activeIndex = 1
                    this.assesmentStep = false;
                    this.getAssesmentData();
                } else if (this.applicant.statusCode == HiringStatusEnum.INTERVIEW_USER) {
                    this.activeIndex = 2
                    this.assesmentStep = false;
                    this.interviewStep = false;
                    this.InterviewData();
                    this.getReviewData();
                } else if (this.applicant.statusCode == HiringStatusEnum.MCU) {
                    this.getMcuData();
                    this.assesmentStep = false;
                    this.interviewStep = false;
                    this.mcuStep = false;
                    this.activeIndex = 3
                } else if (this.applicant.statusCode == HiringStatusEnum.OFFERING) {
                    this.activeIndex = 4
                    this.assesmentStep = false;
                    this.interviewStep = false;
                    this.mcuStep = false;
                    this.offeringStep = false;
                } else {
                    this.activeIndex = 0
                }

                this.stepperMenu();
            })

            firstValueFrom(this.jobService.getByDetail(this.jobId)).then(result => {
                this.job = result;
                console.log('job name =>  ', this.job.employementTypeName);
                if (this.job.createdBy == this.personId) {
                    this.isOwner = true
                }

                firstValueFrom(this.userService.getById(this.job.picId)).then(result => {
                    this.pic = result;
                })
            })

        })



    }

    get isHr() {
        return this.authService.getProfile()?.roleCode == RoleCodeEnum.HR
    }

    get isPic() {
        return this.authService.getProfile()?.roleCode == RoleCodeEnum.PIC
    }

    get isAdmin() {
        return this.authService.getProfile()?.roleCode == RoleCodeEnum.ADMIN
    }

    get isApplied() {
        return this.activeIndex == 0;
    }

    get isAssesment() {
        return this.activeIndex == 1;
    }

    get isInterview() {
        return this.activeIndex == 2;
    }

    get isMcu() {
        return this.activeIndex == 3;
    }

    get isOffering() {
        return this.activeIndex == 4;
    }

    get isHired() {
        return this.activeIndex == 5;
    }

    get mcuDataListReqDto() {
        return this.mcuReqDto.get("mcuData") as FormArray
    }

    stepperMenu() {
        this.status = [
            {
                label: 'Applied',
                command: (event: any) => this.messageService.add({ severity: 'info', summary: 'First Step', detail: event.item.label })
            },
            {
                label: 'Assesment',
                command: (event: any) => this.messageService.add({ severity: 'info', summary: 'Second Step', detail: event.item.label }),
                disabled: this.assesmentStep
            },
            {
                label: 'Interview User',
                command: (event: any) => this.messageService.add({ severity: 'info', summary: 'Third Step', detail: event.item.label }),
                disabled: this.interviewStep
            },
            {
                label: 'MCU',
                command: (event: any) => this.messageService.add({ severity: 'info', summary: 'Fourth Step', detail: event.item.label }),
                disabled: this.mcuStep
            },
            {
                label: 'Offering',
                command: (event: any) => this.messageService.add({ severity: 'info', summary: 'Fifth Step', detail: event.item.label }),
                disabled: this.offeringStep
            }
        ]
    }

    moveTo(event: any) {
        if (event.value == this.status[0].label) {
            this.activeIndex = 0
        } else if (event.value == this.status[1].label) {
            this.activeIndex = 1
        } else if (event.value == this.status[2].label) {
            this.activeIndex = 2
        } else if (event.value == this.status[3].label) {
            this.activeIndex = 3
        } else if (event.value == this.status[4].label) {
            this.activeIndex = 4
        }
    }

    reject() {
        this.applicantReqDto.patchValue({
            applicantId: this.appId,
            applicantCode: this.applicant?.applicantCode,
            statusId: this.applicant?.statusId,
            statusCode: HiringStatusEnum.REJECT
        })
        const data = this.applicantReqDto.getRawValue();

        this.loading = true
        firstValueFrom(this.applicantService.update(data)).then(() => {
            this.loading = false
        }).catch(() => {
            this.loading = false;
        });


    }

    submitAssesment() {
        const data = this.assesmentReqDto.getRawValue();
        this.loading = true;
        firstValueFrom(this.assesmentService.create(data)).then(() => {
            this.assesmentForm = false;
            this.assesmentStep = !this.assesmentStep
            this.getAssesmentData();
            this.activeIndex++;
            this.assesmentReqDto.reset();
            this.loading = false;
            this.stepperMenu();
        }).catch(() => {
            this.loading = false;
        })



    }
    assesmentClick() {
        return this.assesmentForm = !this.assesmentForm;
    }

    assesmentNoteClick() {
        this.assesmentNotesReqDto.patchValue({
            applicantId: this.appId
        })
        return this.assesmentNoteForm = !this.assesmentNoteForm;
    }
    assesmentNotesUpdate() {
        const data = this.assesmentNotesReqDto.getRawValue();
        firstValueFrom(this.assesmentService.updateNotes(data)).then(() => {
            this.assesmentNoteForm = false;
            this.getAssesmentData();
            this.assesmentNotesReqDto.reset();
        });
    }
    getAssesmentData() {
        this.loading = false;
        firstValueFrom(this.assesmentService.getByApplicant(this.appId)).then(result => {
            this.assesmentData = result;
        })

    }

    interviewClick() {
        return this.interviewForm = !this.interviewForm
    }

    interviewNoteClick() {
        this.reviewReqDto.patchValue({
            applicantId: this.appId
        })
        return this.interviewNoteForm = !this.interviewNoteForm;
    }
    interviewNotesUpdate() {
        const data = this.reviewReqDto.getRawValue();
        firstValueFrom(this.reviewService.updateNotes(data)).then(() => {
            this.interviewNoteForm = false;
            this.reviewReqDto.reset();
            this.getReviewData();
        });

    }

    interviewSubmit() {
        this.loading = true;
        const data = this.interviewReqDto.getRawValue();
        firstValueFrom(this.interviewService.create(data)).then(() => {
            this.getReviewData();
            this.InterviewData();
            this.interviewStep = !this.interviewStep;
            this.stepperMenu();
            this.activeIndex++;
            this.interviewForm = false;
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });


    }

    checkForm(form: FormGroup) {
        if (form.invalid) {
            form.markAllAsTouched()
        }
    }

    getReviewData() {
        firstValueFrom(this.reviewService.getByApplicant(this.appId)).then(result => {
            this.reviewData = result;
        })
    }

    InterviewData() {
        firstValueFrom(this.interviewService.getByApplicant(this.appId)).then(result => {
            this.interviewData = result;

        })
    }

    mcuClick() {
        this.mcuDataListReqDto.clear();
        this.mcuReqDto.patchValue({
            applicantId: this.appId,
            applicantCode: this.applicant?.applicantCode,
            statusCode: this.applicant?.statusCode
        })
        return this.mcuForm = !this.mcuForm;
    }

    getMcuData() {
        firstValueFrom(this.mcuService.getByApplicant(this.appId)).then(result => {
            this.mcuDatas = result;
            console.log(this.mcuDatas);
        })
    }

    submitMcu() {
        this.loading = true
        const data = this.mcuReqDto.getRawValue();
        firstValueFrom(this.mcuService.create(data)).then(() => {
            this.getMcuData();
            this.mcuForm = false;
            this.mcuStep = !this.mcuStep;
            this.stepperMenu();
            this.activeIndex++;
            this.mcuReqDto.reset();
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        })
    }




    fileUpload(event: any) {
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
                this.mcuDataListReqDto.push(this.fb.control({
                    fileName: result.substring(result.indexOf(",") + 1, result.length),
                    fileExtension: file.name.substring(file.name.indexOf(".") + 1, file.name.length),
                    name: file.name
                })
                )
            })
        }
    }

    fileRemove(event: any) {
        let length = this.mcuDataListReqDto.length
        let file = event.file
        for (let i = 0; i < length; i++) {
            if (file.name == this.mcuDataListReqDto.at(i)?.value.name) {
                this.mcuDataListReqDto.removeAt(i);
                break;
            }
        }

    }

    fileCancel() {
        this.mcuDataListReqDto.clear();
    }

    offeringClick() {
        this.offeringReqDto.patchValue({
            applicantId: this.appId,
            applicantCode: this.applicant?.applicantCode,
            statusCode: this.applicant?.statusCode
        })
        return this.offeringForm = !this.offeringForm;
    }

    offeringSubmit() {
        this.loading = true;
        const data = this.offeringReqDto.getRawValue();
        firstValueFrom(this.offeringService.create(data)).then(() => {
            this.offeringForm = false;
            this.offeringStep = false;
            this.stepperMenu();
            this.activeIndex++;
            this.offeringReqDto.reset();
            this.loading = false;
            return true
        }).catch(() => {
            this.loading = false;
        });
    }
    accept() {
        this.hiringReqDto.patchValue({
            applicantId: this.appId,
            applicantCode: this.applicant?.applicantCode
        })
        this.hiringForm = !this.hiringForm;
    }

    hiringSubmit() {
        this.loading = true;
        const data = this.hiringReqDto.getRawValue();
        firstValueFrom(this.hiredService.create(data)).then(() => {
            this.loading = false;
            this.router.navigateByUrl(`/jobs/detail/${this.jobId}`);
        }).catch(() => {
            this.loading = false;
        });
    }

}

const convertUTCToLocalDate = function (date: Date) {
    const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    return newDate.toISOString().split('T')[0]
}

const convertUTCToLocalDateTimeISO = function (date: any) {
    const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    return newDate.toISOString()
}


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
