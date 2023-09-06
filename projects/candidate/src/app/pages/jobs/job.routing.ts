import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobListComponent } from "./list/job-list.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { CommonModule } from "@angular/common";
import { JobSavedComponent } from "./saved/job-saved.component";
import { JobDetailComponent } from "./detail/job-detail.component";
import { UrlPipe } from "../../pipe/url.pipe";
import { JobAppliedComponent } from "./applied/job-applied.component";
import { ButtonComponent } from "../../component/button/button.component";

const route: Routes = [
  {
    path: "",
    component: JobListComponent
  },
  {
    path: "saved",
    component: JobSavedComponent
  },
  {
    path: ":id/detail",
    component: JobDetailComponent
  },
  {
    path: "applied",
    component: JobAppliedComponent
  }
]

@NgModule({
  declarations: [JobListComponent, JobSavedComponent, JobDetailComponent, JobAppliedComponent],
  imports: [
    RouterModule.forChild(route),
    SharedModuleComponent,
    CommonModule,
    UrlPipe,
    ButtonComponent
  ],
  exports: []
})
export class JobRouting {

}
