import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar-toolbar-approved',
  styleUrls: ['./calendar-toolbar.scss'],
  templateUrl: './calendar-toolbar.html'
})
export class CalendarToolbarApprovedComponent {
  @Input() view: CalendarView;

  @Input() viewDate: Date;

  @Input() locale = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}
