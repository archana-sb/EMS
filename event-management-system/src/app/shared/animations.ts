import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(10px)' }),
    animate(
      '500ms ease-in-out',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
]);

export const fadeOutAnimation = trigger('fadeOut', [
  transition(':leave', [
    animate(
      '400ms ease-in-out',
      style({ opacity: 0, transform: 'translateY(-10px)' })
    ),
  ]),
]);

export const slideInAnimation = trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate(
      '500ms ease-in-out',
      style({ transform: 'translateX(0)', opacity: 1 })
    ),
  ]),
]);

export const slideOutAnimation = trigger('slideOut', [
  transition(':leave', [
    animate(
      '400ms ease-in-out',
      style({ transform: 'translateX(-100%)', opacity: 0 })
    ),
  ]),
]);
