import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListComponent } from './event-list.component';
import { IEventService } from '../events-services.interface';
import { mockEventsArray, MockEventService } from '../../mockservices/mockEventService';
import { Event_Service_Token, Loading_Service_Token } from '../../shared/tokens';
import { ILoading, LoadingService } from '../../shared/loading.service';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let service: IEventService;
  let loadingService: ILoading;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListComponent],
      providers:[{provide: Event_Service_Token, useClass:MockEventService}, {provide: Loading_Service_Token, useClass: LoadingService}]
    })
    .compileComponents();

    //createComponent returns component instance wrapped in component fixture.
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();//trigger initial data binding
    service = TestBed.inject(Event_Service_Token);
    loadingService = TestBed.inject(Loading_Service_Token);
  });

  it('should create', () => {
    //confirm component exists using Jasmine expectation
    expect(component).toBeTruthy();
  });
  it('should call getEvents on initialisation', () => {

    component.ngOnInit();
    // expect(component.getAllEvents).toHaveBeenCalledWith(1,100);
    expect(loadingService.wrapWithLoading).toHaveBeenCalledWith(service.getEvents(1,100));
  expect(component.events$).toBeTruthy(); //check that events$ is defined
  component.events$.subscribe(events => {
    expect(events).toEqual({events:mockEventsArray, total:100});
  })
  });
  it('should deleteEvent and call getAllEvents', () => {
    const event = mockEventsArray[0];
    component.deleteEvent(event, 1, 100);
    expect(service.deleteEvent).toHaveBeenCalledWith(event.id, 1, 100);
    expect(component.getAllEvents).toHaveBeenCalledWith(1,100);

  });
  it('should call pagechange and getAllEvents', () => {
  
    const event = {pageIndex:1, pageSize:10, length:100};
    component.onPageChange(event);
    expect(component.getAllEvents).toHaveBeenCalledWith(20,10);
  })
});
