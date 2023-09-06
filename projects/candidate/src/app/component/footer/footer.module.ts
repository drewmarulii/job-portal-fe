import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";


@NgModule({
    declarations : [
        FooterComponent
    ],
    imports : [
        RouterModule,
        CommonModule,
        MenubarModule
        
    ],
    exports : [
        FooterComponent
    ]
})
export class FooterModule{

}