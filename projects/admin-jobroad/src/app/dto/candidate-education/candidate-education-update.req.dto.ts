export interface CandidateEducationUpdateReqDto {
    id : string
	degreeName : string
	instituitionName : string
	majors : string
	cgpa : number | null
	startYear : string
	endYear : string
	candidateId : string
}
