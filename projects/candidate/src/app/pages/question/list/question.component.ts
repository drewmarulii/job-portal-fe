import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { firstValueFrom } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionResDto } from "../../../dto/question/question.res.dto";
import { QuestionService } from "../../../service/question.service";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { QuestionAnswerInsertReqDto } from "../../../dto/question-answer/question-answer-insert.req.dto";
import { AnswerService } from "../../../service/question-answer.service";
import { AuthService } from "../../../service/auth.service";
import { testValidation } from "../../../validation/auth.validation";
import { QuestionAnswerResDto } from "../../../dto/question-answer/question-answer.res.dto";
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'question',
    templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit, AfterViewChecked {
    appCode!: string;
    index!: number;
    relogin!: Boolean
    question!: QuestionResDto[];
    answer: QuestionAnswerInsertReqDto[] = [];
    candidateAnswer!: QuestionAnswerResDto[];
    options!: [];
    answerDto = this.fb.group({
        applicantCode: ['', Validators.required],
        answers: this.fb.array(this.answer)
    })
    constructor(
        private questionService: QuestionService,
        private activated: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private cd: ChangeDetectorRef,
        private answerService: AnswerService,
        private route: Router,
        private authService: AuthService,
        private title: Title) {
        this.title.setTitle("Question List")
    }
    ngOnInit(): void {

        firstValueFrom(this.activated.params).then(params => {
            this.appCode = params['code'];
            this.answerDto.patchValue({
                applicantCode: params['code']
            })
            this.getQuestion();

        })

    }


    ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }

    get dataDto() {
        return this.answerDto.get(`answers`) as FormArray
    }

    getQuestion() {
        firstValueFrom(this.answerService.getByApplicant(this.appCode)).then(result => {
            this.candidateAnswer = result;
            if (this.candidateAnswer[0].id != null) {
                this.route.navigateByUrl('/landing');

            }
        }).catch(() => {
            firstValueFrom(this.questionService.getByApplicant(this.appCode)).then(result => {
                this.question = result;
                console.log('Question = ', this.question.length)

                for (let i = 0; i < this.question.length; i++) {
                    this.dataDto.push(
                        this.fb.group({
                            optionId: ['', [Validators.required]],
                            [`questionOptionId${this.dataDto.length}`]: []
                        })
                    )
                }
            }).catch(() => {
                localStorage.setItem('q', 'true');
                localStorage.setItem('code', this.appCode)
                this.route.navigateByUrl('/login');
            })
        })

    }
    selected(event: any, index: number) {
        this.dataDto.at(index).patchValue({
            optionId: event.value
        })
    }

    onSubmit() {
        const data = this.answerDto.getRawValue();
        firstValueFrom(this.answerService.create(data)).then(() => {
            this.route.navigateByUrl('/dashboard')
        })
    }





}