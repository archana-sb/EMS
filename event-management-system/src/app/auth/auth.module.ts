import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    loadChildren: () =>
      import('../events/events.module').then((m) => m.EventsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'events',
    loadChildren: () =>
      import('../events/events.module').then((m) => m.EventsModule),
    canActivate: [AuthGuard],
  },
];
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AuthModule {}
