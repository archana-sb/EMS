import { Component } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { slugify } from '../../utils/slugify';
import { Event, EventsResponse } from '../../models/event-model';
import { fadeInAnimation, slideInAnimation } from '../../shared/animations';
import { PageEvent } from '@angular/material/paginator';
import { IEventService } from '../events-services.interface';
import { ILoading } from '../../shared/loading.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
  animations: [fadeInAnimation, slideInAnimation],
})
export class EventListComponent {
  events$: Observable<EventsResponse | null> = of({ events: [], total: 0 });
  pagedEvents$: Observable<Event[]> = of([]);
  loading$: Observable<boolean> = this.loadingService.loading$;
  constructor(
    private readonly eventService: IEventService,
    private readonly loadingService: ILoading,
  ) {}

  ngOnInit(): void {
    this.getAllEvents(1, 100);
  }

  getAllEvents(page: number, limit: number) {
    this.events$ = this.loadingService.wrapWithLoading(this.eventService
      .getEvents(page, limit));
  }

  slugify(title: string): string {
    return slugify(title);
  }

  deleteEvent(event: Event, page: number, limit: number):void {
    this.eventService
      .deleteEvent(event.id, page, limit)
      .subscribe((res) => this.getAllEvents(page, limit));
  }


  onPageChange(event: PageEvent) {
    const startIndex = (event.pageIndex + 1) * event.pageSize;
    const endIndex = event.pageIndex * 2 * event.pageSize;
    console.log(startIndex, endIndex);
    this.getAllEvents(startIndex, endIndex);
  }
}
