
import { CandidateProfileResDto } from "../candidate-profile/candidate-profile.res.dto";
import { CandidateUserResDto } from "./candidate-user.res.dto";

export interface CandidateMasterResDto {
    candidateUser : CandidateUserResDto
    candidateProfile : CandidateProfileResDto
}