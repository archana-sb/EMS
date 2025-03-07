import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastService } from "../toast.service";
import { Observable, tap } from "rxjs";


@Injectable()
export class SuccessInterceptor implements HttpInterceptor{
    constructor(private readonly toastService: ToastService){}
    intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{

        return next.handle(req).pipe(
            tap(event => {
                if(event.type == 4 && req.method != 'GET' && event.status == 200){
                    this.toastService.showSuccessMessage('Request was successful!');
                }
            })
        )
    }
}