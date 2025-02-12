import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, filter, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private readonly apiUrl = environment.apiUsersUrl; // JSON Server URL

  constructor(
    private readonly http: HttpClient,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  // Register user
  register(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password }).pipe(
      tap(() => {
        this.showSuccessMessage('Registration Succesfull');
        this.router.navigate(['/events']);
      }),
      catchError((error) => {
        console.error('Error occured:', error);
        this.showErrorMessage('Action Failed. Try again!');
        return of(null); // Prevents app crash on error
      })
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
          this.showSuccessMessage('Login Succesfull');
          localStorage.setItem('user', JSON.stringify(users[0]));
          this.router.navigate(['/events']);
        }),
        catchError((error) => {
          console.error('Error occured:', error);
          this.showErrorMessage(error.message);
          return of(null);
        })
      );
  }

  logout() {
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

  showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}
