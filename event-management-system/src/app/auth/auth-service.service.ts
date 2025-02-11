import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private readonly apiUrl = 'http://localhost:3000/users'; // JSON Server URL

  constructor(private readonly http: HttpClient) {}

  // Register user
  register(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  // Login user
  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(
      `${this.apiUrl}?email=${email}&password=${password}`
    );
  }

  logout() {
    localStorage.removeItem('user'); // Remove user from storage
  }
}
