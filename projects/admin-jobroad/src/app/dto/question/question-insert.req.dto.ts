import { QuestionOptionInsertReqDto } from "../question-option/question-option-insert.req.dto"

export interface QuestionInsertReqDto {
  questionDetail: string
  questionCode: string
  options: QuestionOptionInsertReqDto[]
}
