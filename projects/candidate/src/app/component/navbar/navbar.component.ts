import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from 'primeng/api';
import { AuthService } from "../../service/auth.service";
import { BASE_URL } from "../../constant/api.constant";
import { CandidateUserService } from "../../service/candidate-user.service";



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  imageUrl = ''
  profileName = ''
  private roleCode = ''

  constructor(private router: Router, private authService: AuthService, private candidateUserService:CandidateUserService) {

  }

  logOut() {
    localStorage.clear()
    this.router.navigateByUrl('/landing')
  }

  items: MenuItem[] | undefined
  profile: MenuItem[] | undefined

  ngOnInit() {
    console.log('halo ');

    const profile = this.authService.getProfile()

    this.candidateUserService.data?.subscribe({
      next: (e) => {


        if (profile?.photoId) {
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
        this.imageUrl = '../../../assets/emptyProfile.jpeg'
      }
      this.profileName = profile.fullName

    }

    if(profile){
      this.profile = [
        {
          label: this.profileName,
          items: [
            {
              icon: 'pi pi-fw pi-user',
              label: 'Profile',
              routerLink: '/candidates/profile'
            },
            {
              icon: 'pi pi-fw pi-unlock',
              label: 'Change Password',
              routerLink: '/candidates/change-password'
            },
            {
              icon: 'pi pi-fw pi-sign-out',
              label: 'Log Out',
              command: () => this.logOut()
            }
          ]
        }
      ];
    }

    if(profile){
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/dashboard'
        },
        {
          label: 'Companies',
          icon: 'pi pi-id-card',
          routerLink: '/companies'
        },
        {
          label: 'Job Vacancies',
          icon: 'pi pi-briefcase',
          routerLink: '/jobs'
        },
        {
          label: 'Saved Job',
          icon: 'pi pi-bookmark',
          routerLink: '/jobs/saved'
        },
        {
          label: 'Applied Job',
          icon: 'pi pi-check-square',
          routerLink: '/jobs/applied'
        },

      ];
    }
    else{
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/dashboard'
        },
      ];
    }
  }
}


