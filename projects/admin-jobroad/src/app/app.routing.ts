import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModuleComponent } from "./component/shared-module";
import { UrlPipe } from "./pipe/url.pipe";
import { BaseModule } from "./component/base/base.module";
import { ButtonComponent } from "./component/button/button.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./pages/login/login.component";
import { BaseComponent } from "./component/base/base.component";
import { UserModule } from "./pages/users/user.module";
import { CompanyModule } from "./pages/companies/company.module";
import { JobModule } from "./pages/jobs/job.module";
import { CandidateModule } from "./pages/candidates/candidate.module";
import { BenefitModule } from "./pages/benefits/benefit.module";
import { QuestionModule } from "./pages/questions/question.module";
import { NotFoundComponent } from "./component/not-found/not-found.component";
import { ApplicantModule } from "./pages/applicant/applicant.module";
import { authValidation, authValidationNonLogin } from "./validation/auth.validation";
import { RoleCodeEnum } from "./constant/user-role.constant";
import { roleValidation } from "./validation/role.validation";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canMatch: [authValidation]
  },
  {
    component: BaseComponent,
    path: 'dashboard',
    canMatch: [authValidationNonLogin],
    children: [{
      path: '',
      component: DashboardComponent

    }],
  },
  {
    component: BaseComponent,
    path: 'users',
    data: [RoleCodeEnum.ADMIN,RoleCodeEnum.HR,RoleCodeEnum.PIC],
    canMatch: [authValidationNonLogin, roleValidation],
    loadChildren: () => import('./pages/users/user.module').then(u => UserModule),
  },
  {
    component: BaseComponent,
    path: 'applicant',
    loadChildren: () => import('./pages/applicant/applicant.module').then(a => ApplicantModule)
  },
  {
    component: BaseComponent,
    path: 'companies',
    data: [RoleCodeEnum.ADMIN],
    canMatch: [authValidationNonLogin, roleValidation],
    loadChildren: () => import('./pages/companies/company.module').then(u => CompanyModule),
  },
  {
    component: BaseComponent,
    path: 'candidates',
    data: [RoleCodeEnum.ADMIN],
    canMatch: [authValidationNonLogin, roleValidation],
    loadChildren: () => import('./pages/candidates/candidate.module').then(u => CandidateModule),
  },
  {
    component: BaseComponent,
    path: 'benefits',
    data: [RoleCodeEnum.ADMIN],
    canMatch: [authValidationNonLogin, roleValidation],
    loadChildren: () => import('./pages/benefits/benefit.module').then(u => BenefitModule),
  },
  {
    component: BaseComponent,
    path: 'questions',
    data: [RoleCodeEnum.ADMIN],
    canMatch: [authValidationNonLogin, roleValidation],
    loadChildren: () => import('./pages/questions/question.module').then(u => QuestionModule),
  },
  {
    component: BaseComponent,
    path: 'jobs',
    canMatch: [authValidationNonLogin],
    loadChildren: () => import('./pages/jobs/job.module').then(u => JobModule),
  },
  {
    component: BaseComponent,
    path: 'employees',
    canMatch: [authValidationNonLogin],
    loadChildren: () => import('./pages/employees/employees.module').then(e => e.EmployeesModule)
  }
  ,
  {
    component : BaseComponent,
    path : 'reports',
    canMatch : [authValidationNonLogin],
    data : [RoleCodeEnum.ADMIN],
    loadChildren : ()=> import('./pages/report/report.module').then (r => r.ReportModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }

]


@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    NotFoundComponent
  ]
  ,
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    CommonModule,
    UrlPipe,
    BaseModule,
    ButtonComponent,
    SharedModuleComponent
  ],
  exports: [
    RouterModule,
    DashboardComponent,
    LoginComponent,
    NotFoundComponent
  ]
})
export class AppRouting {

}
