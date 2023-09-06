import { CandidateProfileUpdateReqDto } from "../candidate-profile/candidate-profile-update.req.dto"

export interface CandidateUserUpdateReqDto {
    id : string 
	userEmail : string 
	userPassword : string
	profile : CandidateProfileUpdateReqDto
}