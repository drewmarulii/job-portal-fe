import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FileUpload } from "primeng/fileupload";
import { Observable, firstValueFrom } from "rxjs";
import { CompanyService } from "../../../service/company.service";
import { BaseService } from "../../../service/base.service";
import { Title } from "@angular/platform-browser";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";

function getParams(activatedRoute: ActivatedRoute, parentLevel?: number): Observable<Params> {
  let route = activatedRoute
  if (parentLevel) {
    for (let i = 0; i < parentLevel; i++) {
      if (route.parent) {
        route = route.parent
      }
    }
  }
  return route.params
}
@Component({
  selector: 'company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.css']

})
export class CompanyUpdateComponent implements OnInit {
  loading = false
  company!: CompanyResDto

  companyReqDto = this.fb.group({
    id: ['', Validators.required],
    companyCode: ['', Validators.required],
    companyName: ['', Validators.required],
    address: ['', Validators.required],
    companyUrl: ['', Validators.required],
    companyPhone: ['', Validators.required],
    fileName: '',
    fileExtension: '',
  })

  constructor(private companyService: CompanyService, private base: BaseService,
    private title: Title, private activatedRoute: ActivatedRoute,
    private fb: NonNullableFormBuilder,
    private router: Router) {
    this.title.setTitle('Company Update')
  }

  ngOnInit(): void {
    firstValueFrom(getParams(this.activatedRoute, 0)).then(res => {

      this.base.all([
        this.companyService.getDetail(res['id'])
      ])
        .then(result => {
          this.company = result[0]

          this.companyReqDto.patchValue({
            id: result[0].id,
            companyCode: result[0].companyCode,
            companyName: result[0].companyName,
            address: result[0].address,
            companyUrl: result[0].companyUrl,
            companyPhone: result[0].companyPhone,
            fileName: '',
            fileExtension: '',
          })

        })
    })
  }

  checkForm(form: FormGroup) {
    if (form.invalid) {
      form.markAllAsTouched()
    }
  }

  onUpdate() {
    const data = this.companyReqDto.getRawValue();
    if (this.companyReqDto.valid) {
      firstValueFrom(this.companyService.update(data)).then((result) => {
        this.router.navigateByUrl('/companies');
      });
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

        this.companyReqDto.patchValue({
          fileName: resultBase64,
          fileExtension: resultExtension
        })
        fileUpload.clear();
      })
    }
  }
}
