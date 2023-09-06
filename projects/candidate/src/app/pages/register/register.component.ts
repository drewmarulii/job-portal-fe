import { Component, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { CandidateUserService } from "../../service/candidate-user.service";
import { Route, Router } from "@angular/router"
import { firstValueFrom } from "rxjs";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'resgiter',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loading = false
  checkPassword = false

  constructor(private candidateUserService: CandidateUserService, private fb: NonNullableFormBuilder,
    private router: Router,
    private title: Title) {
    this.title.setTitle("Register Account")
  }

  registerReqDto = this.fb.group({
    userEmail: ['', [Validators.required]],
    userPassword: ['', [Validators.required]],
    userConfirmPassword: ['', [Validators.required]],
    profile: this.fb.group({
      fullname: [null, [Validators.required]],
      salutation: '',
      gender: '',
      experience: '',
      expectedSalary: '',
      phoneNumber: '',
      mobileNumber: '',
      nik: '',
      birthDate: '',
      birthPlace: '',
      maritalStatusId: '',
      religionId: '',
      personTypeId: '',
      file: '',
      fileExtension: '',
      candidateStatusId: ''
    })
  })

  checkForm(form: FormGroup) {
    if (form.invalid) {
      return form.markAllAsTouched()
    }
  }

  register() {
    const data = this.registerReqDto.getRawValue()
    if (this.registerReqDto.valid) {
      if (data.userPassword == data.userConfirmPassword) {
        this.candidateUserService.register(data).subscribe()
        this.router.navigateByUrl('/login')
      }
      else {
        this.checkPassword = true
      }
    }
  }

}
