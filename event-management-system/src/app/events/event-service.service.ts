import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, tap } from 'rxjs';
import { Event, EventsResponse } from '../models/event-model';
import { Router } from '@angular/router';
import { IEventService } from './events-services.interface';
import { ToastService } from '../shared/toast.service';
import { handleError } from '../shared/handleError';

@Injectable()
export class EventServiceService implements IEventService {
  // private readonly apiUrl =  environment.apiEventsUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly toastService: ToastService,
    private readonly router: Router,
    @Inject('EVENT_API_URL') private readonly apiUrl:string,

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
        catchError(handleError<EventsResponse>('getEvents'))
      );
  }
  getEvent(id: string | null): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`).pipe(
      retry({
        count: 3,
        delay: 1500,
      }),
      catchError(handleError<Event>('getEvent'))
    );
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event).pipe(
      tap(() => {
        this.toastService.showSuccessMessage('Event Created Succesfully');
        this.router.navigate(['/events']);
      }),
      catchError(handleError<Event>('createEvent'))
    );
  }

  updateEvent(id: string | null, event: Event): Observable<Event> {
   return this.http.put<Event>(`${this.apiUrl}/${id}`, event).pipe(
      tap(() => {
        this.toastService.showSuccessMessage('Event Updated Succesfully.');
        this.router.navigate(['/events']);
      }),
      catchError(handleError<Event>('updateEvent'))
    );
  }

  deleteEvent(id: string, page: number, limit: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.toastService.showSuccessMessage('Event Deleted Succesfully');
      }),
      catchError(handleError<void>('deleteEvent'))
    );
  }




}
