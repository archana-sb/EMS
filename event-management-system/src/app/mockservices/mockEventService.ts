import { Observable, of } from "rxjs";
import { IEventService } from "../events/events-services.interface";
import { Event, EventsResponse } from "../models/event-model";

export const mockEventsArray:Event[] = [
    { id: '1', title: 'Event 1', date: '2023-01-01', location: 'Location 1', description: 'Description 1' },
    { id: '2', title: 'Event 2', date: '2023-01-02', location: 'Location 2', description: 'Description 2' }
];

export const mockEvent1 =  { id: '1', title: 'Event 1', date: '2023-01-01', location: 'Location 1', description: 'Description 1' };


export class MockEventService implements IEventService{
    private readonly events = mockEventsArray;
    getEvent(id: string): Observable<Event> {
        return of({id:'123', title: 'Mock Event', date: '2023-01-01', location: 'Mock Location', description: 'Mock Description' });
    }
    updateEvent(id: string, event: Event): Observable<Event | null> {
        return of({
            ...event,id
        }); // Simulate a successful update
    }

    createEvent(event: Event): Observable<Event | null>  {
        if(event.title && event.date && event.location && event.description)
        return of({
    ...event, id:'1ert4'}); // Simulate a successful creation
else {
    console.error('Error occured: Inva.id event data');
    return of(null);
}    
}

    deleteEvent(id: string, page: number, limit: number): Observable<void> {
        const index = this.events.findIndex(event => event.id == id);
        if(index > -1){
            this.events.splice(index,1);
            
        } else {
            console.error('Could not find event.')
        }
        return of();
    }

    getEvents(page: number, limit: number): Observable<EventsResponse | null>{
        return of({events:this.events, total:100});
    }

}