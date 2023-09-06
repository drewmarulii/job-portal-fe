import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApplicantDetailComponent } from "./detail/applicant-detail.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { ButtonComponent } from "../../component/button/button.component";
import { CommonModule } from "@angular/common";
import { UrlPipe } from "../../pipe/url.pipe";
import { StepsModule } from 'primeng/steps';
import { ApplicantCandidateDetailComponent } from "./candidate/candidate.component";
const routes: Routes = [
    {
        path:':jobId/:applicantId',
        component : ApplicantDetailComponent
    },
    {
        path:'candidate/:jobId/:applicantId',
        component : ApplicantCandidateDetailComponent
    }
]
@NgModule({
    declarations: [
        ApplicantDetailComponent,
        ApplicantCandidateDetailComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModuleComponent,
        ButtonComponent,
        CommonModule,
        UrlPipe,
        StepsModule
    ]
})
export class ApplicantRouting {

}