import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportComponent } from "./detail/report.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { ButtonComponent } from "../../component/button/button.component";
import { CommonModule } from "@angular/common";
import { UrlPipe } from "../../pipe/url.pipe";


const routes: Routes = [
    {
        path: '',
        component: ReportComponent
    }
]



@NgModule({
    declarations: [
        ReportComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModuleComponent,
        ButtonComponent,
        CommonModule,
        UrlPipe
    ]


})
export class ReportRouting {

}