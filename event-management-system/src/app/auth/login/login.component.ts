import { Component, signal } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInAnimation, slideInAnimation } from '../../shared/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [fadeInAnimation, slideInAnimation],
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;
  errorMessage = '';
  constructor(
    private readonly router: Router,
    private readonly authService: AuthServiceService,
    private readonly fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe();
  }
  showPassword(event: Event) {
    event.preventDefault();

    this.hide = !this.hide;
  }
}
