import { inject } from "@angular/core";
import { Route, Router, UrlSegment } from "@angular/router";
import { AuthService } from "../service/auth.service";

export const authValidation = (route: Route, segments: UrlSegment[]) => {
  const auth = inject(AuthService)
  const profile = auth.getProfile()
  const router = inject(Router)

  if (profile) {
    router.navigateByUrl('dashboard')
  }
  return true
}

export const authValidationNonLogin = (route: Route, segments: UrlSegment[]) => {
  const auth = inject(AuthService)
  const profile = auth.getProfile()
  const router = inject(Router)

  if (!profile) {
    router.navigateByUrl('/login')
  }
  return true

}
