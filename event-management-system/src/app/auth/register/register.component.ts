import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { fadeInAnimation, slideInAnimation } from '../../shared/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [fadeInAnimation, slideInAnimation],
})
export class RegisterComponent {
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

  onRegister() {
    const { email, password } = this.loginForm.value;
    this.authService.register(email, password).subscribe();
  }
  showPassword(event: Event) {
    event.preventDefault();

    this.hide = !this.hide;
  }
}
