import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, tap } from 'rxjs';
import { Event, EventsResponse } from '../models/event-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventServiceService {
  private readonly apiUrl =  environment.apiEventsUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  getEvents(page: number, limit: number): Observable<EventsResponse | null> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());

    return this.http
      .get<Event[]>(this.apiUrl, { params, observe: 'response' })
      .pipe(
        map((response: HttpResponse<Event[]>) => {
          const totalItems = Number(response.headers.get('X-Total-Count'));
          const events = response.body || [];
          return { events, total: 100 };
        }),
        catchError((error) => {
          console.error('Error occured:', error);
          this.showErrorMessage('Action Failed. Try again!');
          return of(null);
        })
      );
  }
  getEvent(id: string | null): Observable<Event | null> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`).pipe(
      retry({
        count: 3,
        delay: 1500,
      }),
      catchError((error) => {
        console.error('Error occured:', error);
        this.showErrorMessage('Could not fetch event details. Try again!');
        return of(null);
      })
    );
  }

  createEvent(event: Event): Observable<Event | null> {
    return this.http.post<Event>(this.apiUrl, event).pipe(
      tap(() => {
        this.showSuccessMessage('Event Created Succesfully');
        this.router.navigate(['/events']);
      }),
      catchError((error) => {
        console.error('Error occured:', error);
        this.showErrorMessage('Could not create event. Try again!');
        return of(null);
      })
    );
  }

  updateEvent(id: string | null, event: Event): Observable<Event | null> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event).pipe(
      tap(() => {
        this.showSuccessMessage('Event Updated Succesfully.');
        this.router.navigate(['/events']);
      }),
      catchError((error) => {
        console.error('Error occured:', error);
        this.showErrorMessage('Could not update event. Try again!');
        return of(null);
      })
    );
  }

  deleteEvent(id: number, page: number, limit: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.showSuccessMessage('Event Deleted Succesfully');
      }),
      catchError((error) => {
        console.error('Error occured:', error);
        this.showErrorMessage('Could not delete event. Try again!');
        return of();
      })
    );
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
