
//catch http error and display a user friendly message

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { ToastService } from "../toast.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(private readonly toastService: ToastService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status == 401){
                    this.toastService.showErrorMessage('Unauthorized access. Please log in.');
                } else if(error.status == 404){
                    this.toastService.showErrorMessage('Requested resource not found.');

                } else {
                    this.toastService.showErrorMessage('An error occurred: ' + error.message);
                }
                return throwError(error);
            })
        )
    }
}