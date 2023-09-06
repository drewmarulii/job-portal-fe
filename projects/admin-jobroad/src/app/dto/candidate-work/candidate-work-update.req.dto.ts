export interface CandidateWorkUpdateReqDto {
    id : string
	positionName : string
	companyName : string
	address : string
	responsibility : string
	reasonLeave : string
	lastSalary : number | null
	startDate : string
	endDate : string
	candidateId : string
}
