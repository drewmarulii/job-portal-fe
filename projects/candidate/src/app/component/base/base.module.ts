import { NgModule } from "@angular/core";
import { NavbarModule } from "../navbar/navbar.module";
import { BaseComponent } from "./base.component";
import { RouterModule } from "@angular/router";
import { FooterModule } from "../footer/footer.module";

@NgModule({
  declarations: [
    BaseComponent
  ],
  imports: [
    NavbarModule,
    RouterModule,
    FooterModule
  ],
  exports: [
    BaseComponent,
  ]
})
export class BaseModule {

}
