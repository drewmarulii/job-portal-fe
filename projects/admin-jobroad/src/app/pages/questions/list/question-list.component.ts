import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { QuestionResDto } from "../../../dto/question/question.res.dto";
import { QuestionService } from "../../../service/question.service";
import { firstValueFrom } from "rxjs";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { QuestionOptionService } from "../../../service/question-option.service";
import { QuestionOptionResDto } from "../../../dto/question-option/question-option.res.dto";
import { BaseService } from "../../../service/base.service";
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, AfterViewChecked {
  loading = false
  updateForm = false;
  questions!: QuestionResDto[];
  question!: QuestionResDto;
  questionOptions!: QuestionOptionResDto[];

  questionUpdateReqDto = this.fb.group({
    id: ['', Validators.required],
    questionCode: ['', Validators.required],
    questionDetail: ['', Validators.required],
    options: this.fb.array([])
  })

  isCorrects = [
    {
      name: true,
      key: 'True'
    },
    {
      name: false,
      key: 'False'
    }
  ]

  constructor(private questionService: QuestionService, private fb: NonNullableFormBuilder,
    private questionOptionService: QuestionOptionService, private cd: ChangeDetectorRef,
    private base: BaseService, private title: Title) {
    this.title.setTitle("Question List")
  }

  ngOnInit(): void {
    this.base.all([this.questionService.getAll()])
      .then(result => {
        this.questions = result[0]

      })
  }

  getQuestion() {
    firstValueFrom(this.questionService.getAll()).then(result => {
      this.questions = result;
    })
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  get optionForm() {
    return this.questionUpdateReqDto.get(`options`) as FormArray
  }

  updateClick() {
    this.updateForm = !this.updateForm;

  }

  chooseQuestion(id: string) {
    console.log(id);

    firstValueFrom(this.questionService.getById(id)).then(result => {
      this.question = result;
      this.questionUpdateReqDto.patchValue({
        id: this.question.id,
        questionCode: this.question.questionCode,
        questionDetail: this.question.questionDetail
      })
    })
    firstValueFrom(this.questionOptionService.getByQuestion(id)).then(result => {
      this.questionOptions = result;
      this.add();
    })

  }

  add() {
    this.optionForm.clear();
    for (let i = 0; i < this.questionOptions.length; i++) {
      this.optionForm.push(this.fb.group(this.questionOptions[i]))
    }
  }

  updateSubmit() {
    const data = this.questionUpdateReqDto.getRawValue();
    this.loading = true;
    firstValueFrom(this.questionService.update(data)).then(() => {
      this.updateForm = false;
      this.loading = false;
      this.getQuestion();
    }).catch(() => {
      this.loading = false
    })
  }



  clear(table: Table) {
    table.clear()
  }

}
