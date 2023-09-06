import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import { CommonModule } from "@angular/common";
import { SharedModuleComponent } from "../shared-module";
import { UrlPipe } from "../../pipe/url.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "../button/button.component";


@NgModule({
  declarations: [
    NavbarComponent
  ]
  ,
  exports:[
    NavbarComponent
  ]
  ,
  imports:[
    ReactiveFormsModule,
    CommonModule,
    SharedModuleComponent,
    ButtonComponent,
    UrlPipe
  ]
})
export class NavbarModule {

}
