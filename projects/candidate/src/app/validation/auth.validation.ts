import { Injectable, inject } from "@angular/core";
import { Route, Router, UrlSegment } from "@angular/router";
import { AuthService } from "../service/auth.service";


export const authValidation = (route: Route, segments: UrlSegment[]) => {
    const auth = inject(AuthService)
    const router = inject(Router)

    const profile = auth.getProfile()
    if (profile) {
        router.navigateByUrl('/dashboard')
    }

    return true

}

export const authValidationNonlogin = (route: Route, segments: UrlSegment[]) => {
    const auth = inject(AuthService)
    const router = inject(Router)

    const profile = auth.getProfile()
    if (!profile) {
        router.navigateByUrl(`/landing`)
    }
    return true
}


export const testValidation = () => {
    const auth = inject(AuthService)
    const router = inject(Router)

    const profile = auth.getProfile()
    if (!profile) {
      return false
    }
    return true
}