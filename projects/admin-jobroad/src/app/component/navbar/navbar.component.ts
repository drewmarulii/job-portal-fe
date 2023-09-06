import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from 'primeng/api';
import { AuthService } from "../../service/auth.service";
import { RoleCodeEnum } from "../../constant/user-role.constant";
import { BASE_URL } from "../../constant/api.constant";
import { UserService } from "../../service/user.service";



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  imageUrl = ''
  profileName = ''
  private roleCode = ''

  constructor(private router: Router, private authService: AuthService, private userService:UserService) {

  }

  logOut() {
    localStorage.clear()
    this.router.navigateByUrl('login')
  }

  items: MenuItem[] | undefined
  profile: MenuItem[] | undefined

  ngOnInit() {

    const profile = this.authService.getProfile()
    
    this.userService.data?.subscribe({
      next: (e) => {
        if (profile?.roleCode) {
          this.imageUrl = `${BASE_URL}/files/${e}`;
        }else{
          this.imageUrl = `../../../assets/emptyProfile.jpeg`
        }
      },
      error(e) {
        console.log(e);
      },
    })

    if (profile) {

      if (profile?.photoId) {
        this.imageUrl = `${BASE_URL}/files/${profile.photoId}`
      } else {
        this.imageUrl = `../../../assets/emptyProfile.jpeg`
      }

      this.roleCode = profile?.roleCode
      this.profileName = profile.fullName
    }


    this.profile = [
      {
        label: this.profileName,
        items: [
          {
            icon: 'pi pi-fw pi-user',
            label: 'Profile',
            routerLink: '/users/profile'
          },
          {
            icon: 'pi pi-fw pi-unlock',
            label: 'Change Password',
            routerLink: '/users/change-password'
          },
          {
            icon: 'pi pi-fw pi-sign-out',
            label: 'Log Out',
            command: () => this.logOut()
          }
        ]
      }
    ];

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/dashboard'
      },
      {
        label: 'Menu',
        icon: 'pi pi-th-large',
        items: [
          {
            label: 'Users',
            icon: 'pi pi-users',
            routerLink: '/users',
            visible : this.isAdmin
          },
          {
            label: 'Employees',
            icon: 'pi pi-id-card',
            routerLink: '/employees',
            visible : this.isAdmin
          },
          {
            label: 'Candidates',
            icon: 'pi pi-user',
            routerLink: '/candidates',
            visible : this.isAdmin
          },
          {
            label: 'Companies',
            icon: 'pi pi-id-card',
            routerLink: '/companies',
            visible : this.isAdmin
          },
          {
            label: 'Benefits',
            icon: 'pi pi-money-bill',
            routerLink: '/benefits',
            visible : this.isAdmin
          },
          {
            label: 'Jobs',
            icon: 'pi pi-briefcase',
            routerLink: '/jobs'

          },
          {
            label: 'Questions',
            icon: 'pi pi-question-circle',
            routerLink: '/questions',
            visible : this.isAdmin
          },
          {
            label : 'Reports',
            icon : 'pi pi-book',
            routerLink : '/reports',
            visible : this.isAdmin
          }
        ]
      },
    ];
  }

  get isAdmin(){
    return this.roleCode == RoleCodeEnum.ADMIN
  }

  get isHr(){
    return this.roleCode == RoleCodeEnum.HR
  }

  get isPic(){
    return this.roleCode == RoleCodeEnum.PIC
  }
}


