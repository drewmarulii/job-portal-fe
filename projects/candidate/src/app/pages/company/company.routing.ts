import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompanyListComponent } from "./list/company-list.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { UrlPipe } from "../../pipe/url.pipe";
import { CompanyDetailComponent } from "./detail/company-detail.component";
import { ButtonComponent } from "../../component/button/button.component";

const routes: Routes = [
    {
        path: '',
        component: CompanyListComponent
    },
    {
        path: ":id/detail",
        component: CompanyDetailComponent
    }
]

@NgModule({
    declarations: [CompanyListComponent, CompanyDetailComponent],

    imports: [RouterModule.forChild(routes), ButtonComponent, SharedModuleComponent, UrlPipe],
})

export class CompanyRouting {

}