import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { ButtonComponent } from "../../component/button/button.component";
import { CommonModule } from "@angular/common";
import { SharedModuleComponent } from "../../component/shared-module";
import { UserListComponent } from "./list/user-list.component";
import { UserCreateComponent } from "./create/user-create.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { UserProfileComponent } from "./profile/profile.component";
import { UrlPipe } from "../../pipe/url.pipe";

const routes:Routes = [
  {
    path : '',
    component : UserListComponent,
  },
  {
    path : 'new',
    component : UserCreateComponent,
  },
  {
    path : 'profile',
    component : UserProfileComponent
  },
  {
    path : 'change-password',
    component : ChangePasswordComponent
  }
]

@NgModule({
  declarations:[
    UserProfileComponent,
    ChangePasswordComponent,
    UserCreateComponent,
    UserListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ButtonComponent,
    SharedModuleComponent,
    UrlPipe
  ],
  exports:[
    UserCreateComponent,
    UserListComponent,
    RouterModule
  ]
})
export class UserRouting{

}
