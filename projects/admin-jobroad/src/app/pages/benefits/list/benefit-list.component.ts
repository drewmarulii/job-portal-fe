import { Component, OnDestroy, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { BenefitResDto } from "../../../dto/benefit/benefit.res.dto";
import { BenefitService } from "../../../service/benefit.service";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Subscription, firstValueFrom } from "rxjs";
import { BaseService } from "../../../service/base.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'benefit-list',
  templateUrl: './benefit-list.component.html',
  styleUrls: ['./benefit-list.component.css']
})
export class BenefitListComponent implements OnInit {
  loading = false
  visible: boolean = false;
  benefits!: BenefitResDto[];
  benefitSubscription!: Subscription;
  benefitReqDto = this.fb.group({
    benefitName: [null, [Validators.required]]
  })
  constructor(private benefitService: BenefitService, private fb: NonNullableFormBuilder,
    private base: BaseService, private title: Title) {
    this.title.setTitle("Benefit List")
  }

  ngOnInit(): void {

    this.base.all([
      this.benefitService.getAll()
    ]).then(result => {
      this.benefits = result[0]
    })
  }

  checkForm(form: FormGroup) {
    if (form.invalid) {
      form.markAllAsTouched()
    }
  }


  showDialog() {
    this.visible = true;
  }

  clear(table: Table) {
    table.clear()
  }

  insert() {
    const data = this.benefitReqDto.getRawValue();

    this.loading = true
    firstValueFrom(this.benefitService.create(data)).then(
      () => {

        this.base.all([
          this.benefitService.getAll()
        ]).then(result => {
          this.benefits = result[0]
        })

        this.benefitReqDto.reset();
        this.visible = false;
        this.loading = false
      }).catch(
        () => {
          console.log("error")
          this.loading = false
        })
  }

}
