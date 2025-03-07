import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap} from 'rxjs';
import { IAuthService } from './auth-service.interface';
import { ToastService } from '../shared/toast.service';
import { handleError } from '../shared/handleError';

@Injectable()
export class AuthServiceService implements IAuthService {

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly toastService:ToastService,
    @Inject('USER_API_URL') private readonly apiUrl:string,
  ) {}

  // Register user
  register(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password }).pipe(
      tap(() => {
        this.toastService.showSuccessMessage('Registration Succesfull');
        this.router.navigate(['/events']);
      }),
      catchError(handleError<void>('Register'))
    );
  }

  // Login user
  login(email: string, password: string): Observable<any> {
    return this.http
      .get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        tap((users) => {
          if (users.length == 0) {
            throw new Error('Invalid Email or Password');
          }
          console.log(users);
          this.toastService.showSuccessMessage('Login Succesfull');
          localStorage.setItem('user', JSON.stringify(users[0]));
          this.router.navigate(['/events']);
        }),
        catchError(handleError<void>('Login'))
      );
  }

  logout() {
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

 
}
