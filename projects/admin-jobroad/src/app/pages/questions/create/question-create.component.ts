import { Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { QuestionInsertReqDto } from "../../../dto/question/question-insert.req.dto";
import { QuestionOptionInsertReqDto } from "../../../dto/question-option/question-option-insert.req.dto";
import { QuestionService } from "../../../service/question.service";
import { firstValueFrom } from "rxjs";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'question-create',
  templateUrl: './question-create.component.html'
})
export class QuestionCreateComponent implements OnInit {

  options = [{
    name: "True",
    value: true
  },
  {
    name: "False",
    value: false
  }]

  questionInsertDto: QuestionInsertReqDto[] = []
  questionOptionInsertdto: QuestionOptionInsertReqDto[] = []

  questionsInsertReqDto = this.fb.group(
    {
      newQuestions: this.fb.array(this.questionInsertDto)
    }
  )

  constructor(private fb: NonNullableFormBuilder,

    private questionService: QuestionService,
    private router: Router,
    private title: Title) {
    this.title.setTitle("Create New Question")
  }

  ngOnInit(): void {

  }

  get forms() {
    return this.questionsInsertReqDto.get("newQuestions") as FormArray
  }

  questionOption(i: number) {
    return this.forms.at(i).get("options") as FormArray
  }

  onAdd() {
    this.forms.push(this.fb.group({
      questionTypeId: [0, [Validators.required]],
      questionDetail: ['', [Validators.required]],
      options: this.fb.array(this.questionOptionInsertdto),
      questionTopicId: [0, [Validators.required]],
      questionPackageId: [0, [Validators.required]],
      [`questionTypeId${this.forms.length}`]: [],
    }))
  }



  patchByIndex(event: any, index: number) {
    this.forms.at(index).patchValue({
      questionTypeId: event.value
    })
  }

  remove(i: number) {
    this.forms.removeAt(i)
  }

  onAddOption(indexQuestion: number) {
    this.questionOption(indexQuestion).push(this.fb.group({
      optionLabel: ['', [Validators.required]],
      isCorrect: [false, [Validators.required]]
    }))
  }

  removeOption(indexQuestion: number, indexOption: number) {
    this.questionOption(indexQuestion).removeAt(indexOption)
  }

  chosenOption(index: number, id: number) {
    this.forms.at(index).patchValue({
      questionTypeId: id
    })
  }

  onSubmit() {
    const data = this.questionsInsertReqDto.getRawValue();
    firstValueFrom(this.questionService.create(data)).then(result => {
      console.log(result)
      this.router.navigateByUrl('/questions')
    }
    )
  }
}
