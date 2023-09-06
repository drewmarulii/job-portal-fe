import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeesComponent } from "./employees.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { ButtonComponent } from "../../component/button/button.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { UrlPipe } from "../../pipe/url.pipe";

const route: Routes = [
    {
        path: '',
        component: EmployeesComponent
    }
]



@NgModule({
    declarations: [EmployeesComponent],
    imports: [RouterModule.forChild(route), SharedModuleComponent, ButtonComponent,
        CommonModule, ReactiveFormsModule, UrlPipe]

})
export class EmployeesRouting { }