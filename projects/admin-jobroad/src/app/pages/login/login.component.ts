import { Component } from "@angular/core";
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";

import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { LoginService } from "../../service/login.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  heading = 'headingtitle'
  counter = 0

  loading = false

  userLoginReqDto = this.Fb.group({
    userEmail: ['', [Validators.required]],
    userPassword: ['', [Validators.required]]
  })

  constructor(
    private router: Router,
    private Fb: NonNullableFormBuilder,
    private title: Title,
    private loginService : LoginService) {
    this.title.setTitle('Login')

  }

  checkForm(form:FormGroup){
    if(form.invalid){
      form.markAllAsTouched()
    }
  }

  onLogin() {
    const data = this.userLoginReqDto.getRawValue()

    if (this.userLoginReqDto.valid) {
      this.loading = true
      this.loginService.login(data).subscribe({

        next: (result: any) => {
          console.log('aaaaaaaa')
          this.loading = false
          console.log(result)

          localStorage.setItem('data', JSON.stringify(result))
          this.router.navigateByUrl('/dashboard')

        },
        error: () => {
          console.log("error")
          this.loading = false
        }
      })

    } else {
      console.log('invalid Login')
    }
  }
}
