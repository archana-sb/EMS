import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.guard';

const routes: Routes = [
  //   {
  //     path: '',

  //     pathMatch: 'full',

  //     component: EventListComponent,
  //   }, // Redirect to login on empty path
  //   { path: 'login', component: LoginComponent },  // Login route
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./events/events.module').then((m) => m.EventsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./events/events.module').then((m) => m.EventsModule),
    canActivate: [AuthGuard],
  },
  // Lazy load events module
  //   { path: '**', redirectTo: '/login' }, // Handle unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
