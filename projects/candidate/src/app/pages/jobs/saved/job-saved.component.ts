import { Component, OnInit } from "@angular/core";
import { SavedJobService } from "../../../service/saved-job.service";
import { SavedJobResDto } from "../../../dto/saved-job/saved-job.res.dto";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { Title } from "@angular/platform-browser";
import { BaseService } from "../../../service/base.service";

@Component({
  selector: 'job-saved',
  templateUrl: './job-saved.component.html',
  styleUrls: ['./job-saved.component.css']
})
export class JobSavedComponent implements OnInit {
  savedJobId!: string
  loading = false
  dialogDeleteSavedJob = false
  savedJobs!: SavedJobResDto[]
  savedJobsLength = 0

  haveSaved = false

  constructor(
    private savedJobService: SavedJobService,
    private router: Router,
    private base: BaseService,
    private title: Title) {
    this.title.setTitle("Saved Jobs")
  }

  ngOnInit(): void {
    this.getSavedJobs()
    this.check()
  }

  getSavedJobs() {
    firstValueFrom(this.savedJobService.getByPrincipal()).then(result => {
      this.savedJobs = result
      this.savedJobsLength = this.savedJobs.length
    })
  }

  openDetail(id: string) {
    this.router.navigateByUrl(`jobs/${id}/detail`)
  }

  showDeleteSavedJob(id: string) {
    this.savedJobId = id
    this.dialogDeleteSavedJob = true
  }

  onDeleteSavedJob() {
    firstValueFrom(this.savedJobService.delete(this.savedJobId)).then(result => {
      this.getSavedJobs()
      this.dialogDeleteSavedJob = false
    })
  }

  check() {
    return this.savedJobsLength > 0
  }

}
