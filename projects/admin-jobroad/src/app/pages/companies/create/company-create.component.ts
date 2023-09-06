import { Component } from "@angular/core";
import { CompanyService } from "../../../service/company.service";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { FileUpload } from "primeng/fileupload";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'company-create',
  templateUrl: './company-create.component.html'
})
export class CompanyCreateComponent {
  loading = false
  companyReqDto = this.fb.group({
    companyName: ['', Validators.required],
    address: ['', Validators.required],
    companyUrl: ['', Validators.required],
    companyPhone: ['', Validators.required],
    fileName: ['', Validators.required],
    fileExtension: ['', Validators.required]
  })
  constructor(private companyService: CompanyService,
    private fb: NonNullableFormBuilder, private router: Router,
    private title: Title) {
    this.title.setTitle("Create New Company")
  }

  onSubmit() {
    const data = this.companyReqDto.getRawValue();
    if (this.companyReqDto.valid) {
      firstValueFrom(this.companyService.create(data)).then((result) => {
        this.router.navigateByUrl('/companies');
      });
    }
  }

  checkForm(form: FormGroup) {
    if (form.invalid) {
      return form.markAllAsTouched()
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
