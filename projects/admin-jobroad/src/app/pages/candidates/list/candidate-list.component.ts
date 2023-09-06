import { Component, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { CandidateUserResDto } from "../../../dto/candidate-user/candidate-user.res.dto";
import { CandidateUserService } from "../../../service/candidate-user.service";
import { firstValueFrom } from "rxjs";
import { BaseService } from "../../../service/base.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  loading = false
  candidates!: CandidateUserResDto[]

  constructor(private candidateService: CandidateUserService,
    private base: BaseService,
    private title: Title) {
    this.title.setTitle("Candidate List")
  }
  ngOnInit(): void {

    this.base.all([this.candidateService.getAll()])
      .then(result => {
        this.candidates = result[0]

      })

  }

  getAllCandidates() {
    firstValueFrom(this.candidateService.getAll()).then(result => {
      this.candidates = result
    })
  }

  clear(table: Table) {
    table.clear();
  }

  checker(statusName: string) {
    if (statusName == "Active") {
      return "success";
    }
    else if (statusName == "On Process") {
      return "warning"
    }
    else {
      return "danger"
    }
  }

}
