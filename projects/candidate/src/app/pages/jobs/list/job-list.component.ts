import { Component, OnInit } from "@angular/core";
import { JobService } from "../../../service/job.service";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { AuthService } from "../../../service/auth.service";
import { SavedJobService } from "../../../service/saved-job.service";
import { firstValueFrom } from "rxjs";
import { BaseService } from "../../../service/base.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "job-list",
  templateUrl: "./job-list.component.html",
  styleUrls: ['./job-list.component.css']
})

export class JobListComponent implements OnInit {

  title!: string;
  location!: string;
  salary!: number;

  result = 'Loved'

  loading = true

  jobs?: JobResDto[]
  jobsTopSalary?: JobResDto[]

  constructor(private jobService: JobService,
    private authService: AuthService,
    private savedJobService: SavedJobService,
    private base: BaseService,
    private pageTitle: Title) {
    this.pageTitle.setTitle('Job List')
  }

  ngOnInit() {
    this.base.all([
      this.jobService.getAll(),
      this.jobService.getTopSalary()
    ]).then(result => {
      this.jobs = result[0]
      this.jobsTopSalary = result[1]
    })
  }

  getAllJob() {
    firstValueFrom(this.jobService.getAll()).then(result => {
      this.jobs = result
    })
  }

  getTopSalaryJob() {
    firstValueFrom(this.jobService.getTopSalary()).then(result => {
      this.jobsTopSalary = result
    })
  }

  updateSavedJob(jobId: string) {
    const savedJobDto = {
      jobId
    }
    firstValueFrom(this.savedJobService.insert(savedJobDto)).then(result => {
      this.base.all([
        this.jobService.getAll()
      ]).then(result => {
        this.jobs = result[0]
      })
    })
  }

  deleteSavedJob(jobId: string) {
    firstValueFrom(this.savedJobService.delete(jobId)).then(result => {
      this.base.all([
        this.jobService.getAll()
      ]).then(result => {
        this.jobs = result[0]
      })
    })
  }

  search() {
    console.log('title    ', this.title);
    console.log('lokasi   ', this.location);
    console.log('salary   ', this.salary);


    firstValueFrom(this.jobService.filter(this.title, this.location, this.salary)).then(result => {
      this.jobs = result;
    })
  }


}
