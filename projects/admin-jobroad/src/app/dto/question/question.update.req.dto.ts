import { QuestionOptionInsertReqDto } from "../question-option/question-option-insert.req.dto"
import { QuestionOptionUpdateReqDto } from "../question-option/question-option-update.req.dto"

export interface QuestionUpdateReqDto {
    id : string
    questionDetail: string
    questionCode: string
    options: (QuestionOptionUpdateReqDto | unknown) []
}
