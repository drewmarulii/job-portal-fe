import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../../service/user.service";
import { firstValueFrom } from "rxjs";
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  changePasswordDto = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  })

  constructor(private fb: NonNullableFormBuilder, private router: Router,
    private userService: UserService, private title: Title
  ) {
    this.title.setTitle("Change Password")
  }

  ngOnInit(): void {

  }

  update() {
    const data = this.changePasswordDto.getRawValue()
    if (this.changePasswordDto.valid && data.newPassword === data.confirmPassword) {
      firstValueFrom(this.userService.changePassword(data)).then(result => {
        console.log(result)
        localStorage.clear()
        this.router.navigateByUrl('/login')
      })
    }
    else {
      console.log("Change Password Failed");
    }
  }
}
