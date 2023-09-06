import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobListComponent } from "./list/job-list.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { ButtonComponent } from "../../component/button/button.component";
import { JobCreateComponent } from "./create/job-create.component";
import { CommonModule } from "@angular/common";
import { JobDetailComponent } from "./detail/job-detail.component";
import { UrlPipe } from "../../pipe/url.pipe";
import { JobUpdateComponent } from "./update/job-update.component";

const routes: Routes = [
  {
    path: '',
    component: JobListComponent
  },
  {
    path: 'new',
    component: JobCreateComponent
  },
  {
    path:'detail/:id',
    component : JobDetailComponent
  },
  {
    path : ':id',
    component : JobUpdateComponent
  }
]
@NgModule({
  declarations: [
    JobListComponent,
    JobCreateComponent,
    JobDetailComponent,
    JobUpdateComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModuleComponent,
    ButtonComponent,
    CommonModule,
    UrlPipe
  ]
})
export class JobRouting {

}
