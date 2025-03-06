import { TestBed } from '@angular/core/testing';

import { EventServiceService } from './event-service.service';
import {
  mockEvent1,
  mockEventsArray,
  MockEventService,
} from '../mockservices/mockEventService';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { EVENT_API_URL } from '../shared/tokens';

describe('EventServiceService', () => {
  let service: EventServiceService;
  let httpController: HttpTestingController;//to test the url the service fn call hits and the request method
  let apiUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // { provide: EventServiceService, useClass: MockEventService },
        { provide: EVENT_API_URL, useValue: environment.apiEventsUrl },
      ],
    });
    service = TestBed.inject(EventServiceService);
    httpController = TestBed.inject(HttpTestingController);
    apiUrl = TestBed.inject(EVENT_API_URL);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getEvent and return appropriate event', () => {
    const id = '1';
    service.getEvent(id).subscribe((event) => {
      //assert
      expect(event).toEqual(mockEvent1);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}/${id}`,
    });
    req.flush(mockEventsArray);
  });
  it('should call getEvents and return appropriate events', () => {
    const page: number = 1;
    const limit: number = 10;
    service.getEvents(page, limit).subscribe((events) => {
      //assert
      expect(events).toEqual({ events: mockEventsArray, total: 100 });
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}?_page=${page}&_limit=${limit}`,
    });
    req.flush(mockEventsArray);
  });
  it('should call createEvent and return appropriate event', () => {
    const event = 
      { id: '189', title: 'Event 1', date: '2023-01-01', location: 'Location 1', description: 'Description 1' };
    service.createEvent(event).subscribe(event => {
//assert
expect(event).toEqual({...event, id:'189'})
    })
    const req = httpController.expectOne({
      method:'POST',
      url:`${apiUrl}`
    });
    req.flush({...event,id:'189'});

  });
  it('should call updateEvent and return appropriate event', () => {
    const id = '1';
    const event = 
    { id: '1', title: 'Event 1', date: '2023-01-01', location: 'Location 1', description: 'Description 1' };
service.updateEvent(id,event).subscribe(event => {
  expect(event).toEqual({...event, id})
})
const req = httpController.expectOne({
  method:'PUT',
  url:`${apiUrl}/${id}`
})
req.flush({...event, id});
  })

  it('should call deleteEvent and return void', () => {
    const id= '1';
    const page: number = 1;
    const limit: number = 10;
    service.deleteEvent(id, page, limit).subscribe(event => {
      //assert
      expect(event).toBeUndefined();
    })
    const req = httpController.expectOne({
      method:'DELETE',
      url:`${apiUrl}/${id}`
    })
    req.flush({});
  })
});
