import { NgModule } from "@angular/core";
import { NavbarModule } from "../navbar/navbar.module";
import { BaseComponent } from "./base.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    BaseComponent
  ],
  imports: [
    NavbarModule,
    RouterModule
  ],
  exports: [
    BaseComponent,
  ]
})
export class BaseModule {

}
