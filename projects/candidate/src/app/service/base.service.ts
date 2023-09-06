import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ObservableInputTuple, firstValueFrom, forkJoin } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

import { Router } from "@angular/router";
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    constructor(private http: HttpClient,
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router) { }


    private get token(): string | null {
        const profile = this.authService.getProfile();
        if (profile && profile.token) {
            return profile.token;
        }
        return null;
    }

    private get header() {
        return {
            headers:
                { Authorization: `Bearer ${this.token}` }
        }
    }
    post<T>(url: string, body: any, withToken = true): Observable<T> {
        return this.http.post<T>(url, body, (withToken ? this.header : undefined))
            .pipe(response(this.messageService, this.router));
    }

    get<T>(url: string, withToken = true): Observable<T> {
        return this.http.get<T>(url, (withToken ? this.header : undefined))
            .pipe(response(this.messageService, this.router))

    }



    getWithoutPipe<T>(url: string, withToken = true): Observable<T> {
        return this.http.get<T>(url, (withToken ? this.header : undefined))
    }

    patch<T>(url: string, body: any, withToken = true): Observable<T> {
        return this.http.patch<T>(url, body, (withToken ? this.header : undefined))
            .pipe(response(this.messageService, this.router));


    }

    delete<T>(url: string, withToken = true): Observable<T> {
        return this.http.delete<T>(url, (withToken ? this.header : undefined))
            .pipe(response(this.messageService, this.router));


    }

    all<T extends unknown[]>(data: [...ObservableInputTuple<T>]): Promise<T> {
        return firstValueFrom(
            forkJoin(data).pipe(response(this.messageService, this.router))
        )
    }

}
export function response<T>(messageService: MessageService, router: Router) {
    return tap<T>({
        next: (data) => {
            console.log(data)
            if (data && (data as any).message) {

                messageService.add({ severity: 'success', summary: 'Success', detail: (data as any).message });

            };
        },
        error: (err) => {
            if (err instanceof HttpErrorResponse) {
                if (err && err.error && err.error.message) {
                    messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    console.log(err.error);

                    if (err.status == 401 && err.error.message == 'token expired') {
                        localStorage.clear();
                        console.log('xxxxx');
                        router.navigateByUrl('/login');
                    }
                }
            }

        }
    })
}
