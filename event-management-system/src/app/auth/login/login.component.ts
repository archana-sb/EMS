import { Component, signal } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
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
    this.authService.login(email, password).subscribe((users) => {
      if (users.length > 0) {
        localStorage.setItem('user', JSON.stringify(users[0]));
        this.router.navigate(['/events']);
      } else {
        this.errorMessage = 'Invalid email or password';

        if (confirm('No account found. Do you want to register?')) {
          this.router.navigate(['/register']);
        }
      }
    });
  }
}
