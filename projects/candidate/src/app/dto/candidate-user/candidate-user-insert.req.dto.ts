import { CandidateProfileInsertReqDto } from "../candidate-profile/candidate-profile-insert.req.dto"

export interface CandidateUserInsertReqDto {
  userEmail: string | null
  userPassword: string | null
  profile: CandidateProfileInsertReqDto 
}
