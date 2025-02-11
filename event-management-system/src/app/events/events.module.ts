import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventViewComponent } from './event-view/event-view.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: EventListComponent,
    children: [
      { path: '', component: EventListComponent },
      { path: 'create-event', component: EventCreateComponent }, // Default to event list
      { path: ':id/:name', component: EventViewComponent }, // Show event details
    ],
  },
  { path: '**', redirectTo: 'events' },
  // { path: 'create-event', component: EventCreateComponent },
  // { path: ':id/:name', component: EventDetailsComponent },
];
@NgModule({
  declarations: [
    EventListComponent,
    EventCreateComponent,
    EventEditComponent,
    EventViewComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsModule {}
