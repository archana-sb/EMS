import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthServiceService } from '../../auth/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private readonly mobileQueryListener: () => void;
  opened: boolean = true;
  isMobile = false;

  constructor(
    private readonly media: MediaMatcher,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthServiceService
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 768px)');
    this.isMobile = this.mobileQuery.matches;
    this.mobileQueryListener = () => (this.isMobile = this.mobileQuery.matches);
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  options = this.formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });

  logout() {
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
