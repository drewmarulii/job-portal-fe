import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core"
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FileUpload } from "primeng/fileupload";
import { Table } from "primeng/table";
import { RoleService } from "../../../service/role.service";
import { UserService } from "../../../service/user.service";
import { RoleResDto } from "../../../dto/role/role.res.dto";
import { PersonTypeService } from "../../../service/person-type.service";
import { PersonTypeResDto } from "../../../dto/person-type/person-type.res.dto";
import { firstValueFrom } from "rxjs";
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html'
})
export class UserCreateComponent implements OnInit, AfterViewChecked {

  roles!: RoleResDto[]

  loading = false
  userReqDto = this.fb.group({
    userEmail: ['', Validators.required],
    roleId: ['', Validators.required],
    address: ['', Validators.required],
    fullName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    photoName: [''],
    extensionName: ['']
  })

  constructor(private router: Router,
    private roleService: RoleService,
    private fb: NonNullableFormBuilder,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private typeService: PersonTypeService,
    private title: Title) {
    this.title.setTitle("Create New User")
  }

  ngOnInit(): void {
    this.getRoles()
  }


  getRoles() {
    firstValueFrom(this.roleService.getAll()).then(result => {
      this.roles = result
    })
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges()
  }

  insert() {
    const data = this.userReqDto.getRawValue()
    if (this.userReqDto.valid) {
      this.loading = true
      firstValueFrom(this.userService.create(data)).then(result => {
        this.loading = false
        console.log(result);
        this.router.navigateByUrl('users')
      })
    }
  }

  fileUpload(event: any, fileUpload: FileUpload) {
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
      };
      reader.onerror = error => reject(error);
    });

    for (let file of event.files) {
      toBase64(file).then(result => {
        const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
        const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)
        this.userReqDto.patchValue({
          extensionName: resultExtension, photoName: resultBase64
        })
        fileUpload.clear()
        console.log(resultBase64)
        console.log(resultExtension)
      })
    }
  }
}
