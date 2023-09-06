import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { SharedModule } from "primeng/api";
import { SharedModuleComponent } from "../../component/shared-module";
import { CommonModule } from "@angular/common";
import { UrlPipe } from "../../pipe/url.pipe";
import { ButtonComponent } from "../../component/button/button.component";
import { QuestionComponent } from "./list/question.component";


const routes = [
    {
        path : ':code',
        component : QuestionComponent
    }
]

@NgModule({
    declarations : 
    [
        QuestionComponent
    ],
    imports : 
    [
        RouterModule.forChild(routes),
        SharedModuleComponent,
        CommonModule,
        UrlPipe,
        ButtonComponent

    ],
    exports : 
    [

    ]
})
export class QuestionRouting{

}