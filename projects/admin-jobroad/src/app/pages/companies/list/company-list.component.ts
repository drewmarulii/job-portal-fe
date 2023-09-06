import { Component, OnDestroy, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { CompanyService } from "../../../service/company.service";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { Subscription } from "rxjs";
import { BaseService } from "../../../service/base.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies!: CompanyResDto[];
  companySubscription!: Subscription;

  constructor(private companyService: CompanyService, private base: BaseService,
    private title: Title) {
    this.title.setTitle("Company List")
  }

  ngOnInit(): void {
    this.base.all([
      this.companyService.getAll()
    ]).then(result => {
      this.companies = result[0]
    })
  }

  loading = false

}
