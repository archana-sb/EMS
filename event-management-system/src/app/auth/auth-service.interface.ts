// this interface will be used to define the contract for auth service

import { Observable } from "rxjs";

export interface IAuthService{
    register(email:string, password:string):Observable<any>;
    login(email:string, password:string): Observable<any>;
    logout():void;
}