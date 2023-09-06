import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BenefitListComponent } from "./list/benefit-list.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { ButtonComponent } from "../../component/button/button.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: BenefitListComponent
  }
]
@NgModule({
  declarations: [
    BenefitListComponent
  ]
  ,
  imports: [
    RouterModule.forChild(routes),
    SharedModuleComponent,
    ButtonComponent,
    CommonModule
  ],
  exports:[
    BenefitListComponent
  ]
})
export class BenefitRouting {

}
