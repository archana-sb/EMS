import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

export interface ILoading{
    loading$: Observable<boolean>;
    setLoading(loading:boolean):void;
    wrapWithLoading<T>(observable: Observable<T>):Observable<T>;
}

@Injectable()
export class LoadingService implements ILoading {
    private readonly loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    setLoading(loading:boolean):void{
        this.loadingSubject.next(loading);
    }


//method to handle loading state around an observable
    wrapWithLoading<T>(observable: Observable<T>): Observable<T>{
        this.setLoading(true);
        return observable.pipe(tap({
            next: () => this.setLoading(false),
            error: () => this.setLoading(false)
        }));
    }
}