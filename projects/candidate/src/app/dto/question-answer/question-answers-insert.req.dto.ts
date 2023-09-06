import { QuestionAnswerInsertReqDto } from "./question-answer-insert.req.dto";

export interface QuestionAnswersInsertReqDto{
    answers : QuestionAnswerInsertReqDto[];
    applicantCode :string;
}
