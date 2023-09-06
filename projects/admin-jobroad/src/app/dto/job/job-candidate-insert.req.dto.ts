export interface JobCandidateInsertReqDto {
    jobName : string
	companyId : string
	startDate : string
	endDate : string
	description : string
	hrId : string
	picId : string
	expectedSalaryMin : string
	expectedSalaryMax : string
	employmentTypeId : string
	file : string
	fileExtension : string
}