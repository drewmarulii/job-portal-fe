import { Component, OnInit } from "@angular/core";
import { CompanyService } from "../../../service/company.service";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { firstValueFrom } from "rxjs";
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

    companies!: CompanyResDto[]
    imageUrl!: string

    constructor(private companyService: CompanyService,
        private title: Title) {
        this.title.setTitle("Company List")
    }

    ngOnInit() {
        this.getCompanies()


    }

    getCompanies() {
        firstValueFrom(this.companyService.getAll()).then(result => {
            this.companies = result
        })
    }



}
