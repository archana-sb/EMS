//this interface withh be used to define contract for events service

import { Observable } from "rxjs";
import { Event, EventsResponse } from "../models/event-model";

export interface IEventService{
    getEvents(page: number, limit: number):Observable<EventsResponse | null>;
    getEvent(id: string | null):Observable<Event | null>;
    createEvent(event: Event):Observable<Event | null>;
    updateEvent(id: string | null, event: Event):Observable<Event | null>;
    deleteEvent(id: string, page: number, limit: number):Observable<void>;
}