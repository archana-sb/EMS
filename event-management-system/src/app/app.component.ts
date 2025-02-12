import { Component } from '@angular/core';
import { fadeInAnimation, slideInAnimation } from './shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeInAnimation, slideInAnimation],
})
export class AppComponent {
  title = 'event-management-system';
}
