import { QuestionOptionResDto } from "../question-option/question-option.req.dto";

export interface QuestionResDto {
  id: string
  questionDetail: string
  options: QuestionOptionResDto[]
}
