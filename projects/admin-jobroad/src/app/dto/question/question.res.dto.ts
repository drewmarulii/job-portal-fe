import { QuestionOptionResDto } from "../question-option/question-option.res.dto";

export interface QuestionResDto {
  id: string
  questionDetail: string
  questionCode : string
  options: QuestionOptionResDto[]
}
