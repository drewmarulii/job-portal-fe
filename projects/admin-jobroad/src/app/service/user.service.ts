import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable, Observer } from "rxjs";
import { UserResDto } from "../dto/user/user.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { UserInsertReqDto } from "../dto/user/user-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { UserChangePasswordReqDto } from "../dto/user/user-changepassword.req.dto";
import { ProfileResDto } from "../dto/profile/profile.res.dto";
import { ProfileUpdateReqDto } from "../dto/profile/profile-update.req.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  data?: Observable<string>;
  private dataObserver?: Observer<string>;


  constructor(private base: BaseService) {
    this.data = new Observable<string>(
      (observer) => (this.dataObserver = observer)
    );
  }

  getAllUser(): Observable<UserResDto[]> {
    return this.base.getWithoutPipe<UserResDto[]>(`${BASE_URL}/users`);
  }

  getByRole(roleCode: string): Observable<UserResDto[]> {
    return this.base.getWithoutPipe<UserResDto[]>(`${BASE_URL}/users/filter?roleCode=${roleCode}`);
  }

  create(data: UserInsertReqDto): Observable<InsertResDto> {
    return this.base.post<InsertResDto>(`${BASE_URL}/users`, data);
  }

  changePassword(data: UserChangePasswordReqDto): Observable<UpdateResDto> {
    return this.base.patch<UpdateResDto>(`${BASE_URL}/users`, data);
  }

  getById(id: string): Observable<UserResDto> {
    return this.base.getWithoutPipe<UserResDto>(`${BASE_URL}/users/detail?id=${id}`);
  }

  getProfile(id: string): Observable<ProfileResDto> {
    return this.base.getWithoutPipe<ProfileResDto>(`${BASE_URL}/users/profile?id=${id}`);
  }

  updateProfile(data: ProfileUpdateReqDto): Observable<UpdateResDto> {
    return this.base.patch<UpdateResDto>(`${BASE_URL}/users/profile`, data);
  }

  navbarObservable(id: string) {
    this.dataObserver?.next(id);
  }
}
