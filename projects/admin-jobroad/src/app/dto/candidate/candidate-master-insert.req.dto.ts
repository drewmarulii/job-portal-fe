import { CandidateAddressInsertReqDto } from "../candidate-address/candidate-address-insert.req.dto"
import { CandidateDocumentInsertReqDto } from "../candidate-document/candidate-document-insert.req.dto"
import { CandidateEducationInsertReqDto } from "../candidate-education/candidate-education-insert.req.dto"
import { CandidateFamilyInsertReqDto } from "../candidate-family/candidate-family-insert.req.dto"
import { CandidateLanguageInsertReqDto } from "../candidate-language/candidate-language-insert.req.dto"
import { CandidateProjectInsertReqDto } from "../candidate-project/candidate-project-insert.req.dto"
import { CandidateReferencesInsertReqDto } from "../candidate-references/candidate-references-insert.req.dto"
import { CandidateSkillInsertReqDto } from "../candidate-skill/candidate-skill-insert.req.dto"
import { CandidateTrainingInsertReqDto } from "../candidate-training/candidate-training-insert.req.dto"
import { CandidateWorkInsertReqDto } from "../candidate-work/candidate-work-insert.req.dto"

export interface CandidateMasterInsertReqDto {
    userEmail : string
    salutation : string
    fullname : string
    gender : string
    experience : string
    expectedSalary : number | null
    phoneNumber : string
    mobileNumber : string
    nik : string
    birthDate : string
    birthPlace : string
    maritalStatusId : string
    religionId : string
    file : string
    fileExtension : string
    candidateAddress : CandidateAddressInsertReqDto[]
    candidateDocuments : CandidateDocumentInsertReqDto[]
    candidateEducations : CandidateEducationInsertReqDto[]
    candidateFamily : CandidateFamilyInsertReqDto[]
    candidateLanguage : CandidateLanguageInsertReqDto[]
    candidateProjectExp : CandidateProjectInsertReqDto[]
    candidateReferences : CandidateReferencesInsertReqDto[]
    candidateSkill : CandidateSkillInsertReqDto[]
    candidateTrainingExp : CandidateTrainingInsertReqDto[]
    candidateWorkExp : CandidateWorkInsertReqDto[]
}
