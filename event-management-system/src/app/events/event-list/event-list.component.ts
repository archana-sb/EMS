import { Component } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { slugify } from '../../utils/slugify';
import { EventServiceService } from '../event-service.service';
import { Event, EventsResponse } from '../../models/event-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInAnimation, slideInAnimation } from '../../shared/animations';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
  animations: [fadeInAnimation, slideInAnimation],
})
export class EventListComponent {
  events$: Observable<EventsResponse | null> = of({ events: [], total: 0 });
  pagedEvents$: Observable<Event[]> = of([]);
  loading: boolean = false;
  constructor(
    private readonly eventService: EventServiceService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllEvents(1, 100);
  }

  getAllEvents(page: number, limit: number) {
    this.loading = true;
    this.events$ = this.eventService
      .getEvents(page, limit)
      .pipe(tap(() => (this.loading = false)));
  }

  slugify(title: string): string {
    return slugify(title);
  }

  deleteEvent(event: Event, page: number, limit: number) {
    this.eventService
      .deleteEvent(event.id, page, limit)
      .subscribe((res) => this.getAllEvents(page, limit));
  }
  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = (event.pageIndex + 1) * event.pageSize;
    const endIndex = event.pageIndex * 2 * event.pageSize;
    console.log(startIndex, endIndex);
    this.getAllEvents(startIndex, endIndex);
  }
}
