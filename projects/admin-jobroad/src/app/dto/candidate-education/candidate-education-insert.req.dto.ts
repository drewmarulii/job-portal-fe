export interface CandidateEducationInsertReqDto {
    degreeName : string
	instituitionName : string
	majors : string
	cgpa : number | null
	startYear : string
	endYear : string
	candidateId : string
	email : string
}
