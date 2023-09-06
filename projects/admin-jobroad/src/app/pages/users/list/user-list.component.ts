import { Component, OnInit } from "@angular/core"
import { Table } from "primeng/table";
import { UserService } from "../../../service/user.service";
import { UserResDto } from "../../../dto/user/user.res.dto";
import { firstValueFrom } from "rxjs";
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  loading = false
  users!: UserResDto[]

  constructor(private userService: UserService,
    private title: Title) {
    this.title.setTitle("User List")
  }

  ngOnInit(): void {
    this.getUsers()
  }

  clear(table: Table) {
    table.clear();
  }

  getUsers() {
    firstValueFrom(this.userService.getAllUser()).then(result => {
      this.users = result
    })
  }

}
