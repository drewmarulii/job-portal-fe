import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { LoginService } from "../../service/login.service";
import { Router } from "@angular/router";
import { ɵparseCookieValue } from "@angular/common";
import { Title } from "@angular/platform-browser";


@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    testVal = localStorage.getItem('q')
    appId = localStorage.getItem('code')


    loading = false;

    constructor(private fb: NonNullableFormBuilder,
        private loginService: LoginService,
        private router: Router,
        private title: Title) {

        this.title.setTitle("Login")
    }



    loginReqDto = this.fb.group({
        userEmail: ['', [Validators.required]],
        userPassword: ['', [Validators.required]]
    })

    onLogin() {
        this.testVal = localStorage.getItem('q')
        this.appId = localStorage.getItem('code')
        if (this.loginReqDto.valid) {
            const data = this.loginReqDto.getRawValue()
            this.loginService.login(data).subscribe({

                next: (result: any) => {
                    console.log('testval =>  ' + this.testVal);
                    console.log('appid =>  ' + this.appId)
                    this.loading = false
                    console.log(result)
                    localStorage.setItem('data', JSON.stringify(result))
                    if (this.testVal != null) {
                        if (this.testVal == 'true') {
                            console.log('testval ==  ' + this.testVal);
                            this.router.navigateByUrl(`/questions/${this.appId}`)
                        } else {
                            this.router.navigateByUrl('/dashboard')
                        }
                    } else {
                        this.router.navigateByUrl('/dashboard')
                    }

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
