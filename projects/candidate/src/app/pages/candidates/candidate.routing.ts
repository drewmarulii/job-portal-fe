import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { ButtonComponent } from "../../component/button/button.component";
import { CandidateProfileComponent } from "./profile/candidate-profile.component";
import { CommonModule } from "@angular/common";
import { UrlPipe } from "../../pipe/url.pipe";
import { CandidateUpdateComponent } from "./update/candidate-update.component";

const routes: Routes = [
  {
    path: 'change-password',
    component: ChangePasswordComponent
  }, 
  {
    path: 'profile',
    component: CandidateProfileComponent
  },
  {
    path: 'profile/update',
    component: CandidateUpdateComponent
  }
]
@NgModule({
  declarations: [
    ChangePasswordComponent,
    CandidateProfileComponent,
    CandidateUpdateComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModuleComponent,
    ButtonComponent,
    UrlPipe
  ]
  ,
  exports: [

  ]
})
export class CandidateRouting {

}
