import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable, firstValueFrom} from "rxjs";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { CompanyService } from "../../../service/company.service";
import { BaseService } from "../../../service/base.service";
import { Title } from "@angular/platform-browser";

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
  selector:'company-detail',
  templateUrl:'./company-detail.component.html',
  styleUrls:['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit{

  company!:CompanyResDto

  constructor(private companyService:CompanyService,private base:BaseService,
    private title:Title, private activatedRoute:ActivatedRoute) {
    this.title.setTitle('Company Detail')
  }

  ngOnInit(): void {
    firstValueFrom(getParams(this.activatedRoute,0)).then( res => {
      this.base.all([
        this.companyService.getDetail(res['id'])
      ])
      .then(result => {
        this.company = result[0]

      })
    })
  }


}
