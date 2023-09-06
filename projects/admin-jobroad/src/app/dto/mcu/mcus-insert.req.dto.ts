import { McuInsertReqDto } from "./mcu-insert.req.dto";

export interface McusInsertReqDto {
    applicantId : string
	applicantCode : string
	statusCode : string
	mcuData :  (McuInsertReqDto | unknown) []
}