import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompanyListComponent } from "./list/company-list.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { ButtonComponent } from "../../component/button/button.component";
import { CompanyCreateComponent } from "./create/company-create.component";
import { CommonModule } from "@angular/common";
import { CompanyUpdateComponent } from "./update/company-update.component";
import { CompanyDetailComponent } from "./detail/company-detail.component";
import { UrlPipe } from "../../pipe/url.pipe";

const routes: Routes = [
  {
    path: '',
    component: CompanyListComponent
  },
  {
    path: 'detail/:id',
    component: CompanyDetailComponent
  },
  {
    path: ':id/update',
    component: CompanyUpdateComponent
  },
  {
    path: 'new',
    component: CompanyCreateComponent
  }
]
@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyCreateComponent,
    CompanyUpdateComponent,
    CompanyDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModuleComponent,
    ButtonComponent,
    CommonModule,
    UrlPipe
  ],
  exports: [

  ]
})
export class CompanyRouting {

}
