import { Component, OnInit } from "@angular/core";
import { QuestionOptionResDto } from "../../../dto/question-option/question-option.res.dto";
import { firstValueFrom } from "rxjs";
import { QuestionOptionService } from "../../../service/question-option.service";
import { ActivatedRoute } from "@angular/router";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";


@Component({
    selector: 'question-detail',
    templateUrl: './question-detail.component.html'
})
export class QuestionDetailComponent implements OnInit {
    questionOptions!: QuestionOptionResDto[];
    questionOption!: QuestionOptionResDto;

    questionId!: string;

    optionUpdateReqDto = this.fb.group({
        id: ['', Validators.required],
        optionLabel: ['', Validators.required],
        isCorrect: [false, Validators.required],
        questionId: ['', Validators.required]
    })

    option = [
        {
            name: true,
            key: 'True'
        },
        {
            name: false,
            key: 'False'
        }
    ]

    modal = false;
    constructor(private questionOptionService: QuestionOptionService,
        private activated: ActivatedRoute, private fb: NonNullableFormBuilder,
        private title: Title) {
        this.title.setTitle("Question Detail")
    }

    ngOnInit(): void {
        firstValueFrom(this.activated.params).then(param => {
            this.questionId = param['id']
            this.getData();
            this.optionUpdateReqDto.patchValue({
                questionId: param['id']
            })
        })
    }

    getData() {
        firstValueFrom(this.questionOptionService.getByQuestion(this.questionId)).then(result => {
            this.questionOptions = result;

        })
    }

    updateClick(id: string) {
        firstValueFrom(this.questionOptionService.getById(id)).then(result => {
            this.questionOption = result;
            this.optionUpdateReqDto.patchValue({
                id: this.questionOption.id,
                optionLabel: this.questionOption.optionLabel,
                isCorrect: this.questionOption.isCorrect
            })
            this.modal = !this.modal;
        })
    }

    onSubmit() {
        const data = this.optionUpdateReqDto.getRawValue()
        firstValueFrom(this.questionOptionService.updateOption(data)).then(() => {
            this.modal = !this.modal;
            this.getData();
        })
    }


}