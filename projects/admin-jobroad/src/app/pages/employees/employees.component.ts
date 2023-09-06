import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../service/employee.service";
import { EmployeeResDto } from "../../dto/employee/employee.res.dto";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { BlacklistService } from "../../service/blacklist.service";
import { firstValueFrom } from "rxjs";
import { BaseService } from "../../service/base.service";
import { Title } from "@angular/platform-browser";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employee?: EmployeeResDto
  employees!: EmployeeResDto[]
  visible: boolean = false;

  blacklistReqDto = this.fb.group({
    candidateEmail: ['', [Validators.required]],
    notes: ['', [Validators.required]]
  })


  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private blacklistService: BlacklistService,
    private base: BaseService,
    private title: Title
  ) {
    this.title.setTitle("Employee List")
  }

  showDialog(id: string) {
    this.blacklistReqDto.reset()
    firstValueFrom(this.employeeService.getById(id))
      .then((res) => {
        this.employee = res
        const profile = this.authService.getProfile()
        if (profile?.userId === this.employee?.createdBy) {
          this.visible = true
        } else {
          this.visible = true
        }
        this.blacklistReqDto.patchValue({
          candidateEmail: this.employee?.candidateEmail
        })
      })
  }

  ngOnInit(): void {
    this.base.all([
      this.employeeService.getAll()
    ]).then(result => {
      this.employees = result[0]
    })

  }

  checkForm(form: FormGroup) {
    if (form.invalid) {
      form.markAllAsTouched()
    }
  }

  onSubmit() {
    if (this.blacklistReqDto.valid) {
      const data = this.blacklistReqDto.getRawValue()
      firstValueFrom(this.blacklistService.create(data)).then(() => {

        this.base.all([
          this.employeeService.getAll()
        ]).then(result => {
          this.employees = result[0]
        })
      })
    }
    else {
      console.log("invalid");
    }
    this.visible = false
  }

}
