import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-create/event-form.component';
import { RouterModule, Routes } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { EventServiceService } from './event-service.service';
import { environment } from '../../environments/environment';
import { ToastService } from '../shared/toast.service';
import { Event_Service_Token, Loading_Service_Token } from '../shared/tokens';
import { LoadingService } from '../shared/loading.service';

const routes: Routes = [
  {
    path: 'events',
    component: NavbarComponent,
    children: [
      { path: '', component: EventListComponent },
      { path: 'create-new', component: EventFormComponent },
      { path: ':mode/:id/:name', component: EventFormComponent },
    ],
  },
  { path: '**', redirectTo: 'events' },
];
@NgModule({
  declarations: [EventListComponent, EventFormComponent, NavbarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatGridListModule,
  ],
  exports: [RouterModule],
  //inject an instance of EventServiceService when IEventService is requested
  //
  providers: [DatePipe, {provide: Loading_Service_Token, useClass: LoadingService}, {provide: Event_Service_Token, useClass: EventServiceService}, {provide: 'EVENT_API_URL', useValue: environment.apiEventsUrl}, ToastService],
})
export class EventsModule {}
