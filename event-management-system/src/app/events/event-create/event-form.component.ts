import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap, filter, map, tap } from 'rxjs';
import { EventServiceService } from '../event-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInAnimation, slideInAnimation } from '../../shared/animations';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
  animations: [fadeInAnimation, slideInAnimation],
})
export class EventFormComponent {
  eventForm: FormGroup;
  mode: string | null = 'edit';
  errorMessage: string | null = null;
  eventId: string | null = null;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly eventService: EventServiceService,
    private readonly snackBar: MatSnackBar
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => {
          this.mode = params.get('mode');
          if (this.mode == 'view') this.eventForm.disable();
          this.eventId = params.get('id');
          return this.eventId;
        }),

        filter((eventId) => Boolean(eventId)),
        switchMap((eventId) =>
          this.eventService.getEvent(eventId).pipe(
            tap((res) => {
              if (res) this.eventForm.patchValue(res);
            })
          )
        )
      )
      .subscribe();
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      this.showErrorMessage('Event Form Invalid. Try again!');
      return;
    }
    const serviceCall =
      this.mode == 'edit'
        ? this.eventService.updateEvent(
            this.eventId,
            this.eventForm.getRawValue()
          )
        : this.eventService.createEvent({ ...this.eventForm.getRawValue() });

    if (this.eventForm.valid) {
      serviceCall.subscribe();
    }
  }

  showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}
