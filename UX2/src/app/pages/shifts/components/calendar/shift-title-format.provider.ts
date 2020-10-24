import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';

@Injectable()
export class ApprovedShiftTitleFormatProvider extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  // you can override any of the methods defined in the parent class

  month(event: CalendarEvent): string {
    return `<b>${event.title}</b>`;
  }

  week(event: CalendarEvent): string {
    return `<b>${event.title}</b>`;
  }

  day(event: CalendarEvent): string {
    return `<b>${event.title}</b>`;
  }
}
