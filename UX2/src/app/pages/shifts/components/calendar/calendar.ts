import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, OnDestroy, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ShiftTitleFormatProvider} from "./shift-title-format-provider";
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTitleFormatter,
  CalendarView
} from 'angular-calendar';
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {map, takeUntil} from "rxjs/operators";
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {
  addDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth
} from 'date-fns';
import {Router} from "@angular/router";
import {CustomDateFormatProvider} from "./custom-date-format.provider";

@Injectable()

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: ShiftTitleFormatProvider
    },
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatProvider
    }
  ]
})
export class CalendarPage implements OnInit, OnDestroy {

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  clickedDate: Date;
  activeDayIsOpen: boolean;
  shift: ScheduledShift;
  daysInWeek = 7;
  id = '';
  events$: Observable<CalendarEvent<{ shift: ScheduledShift }>[]>;

  actions: CalendarEventAction[] = [];
  private destroy$ = new Subject();

  constructor(
    private http: HttpClient,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef
  ) {
  }

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  ngOnInit(): void {
    this.fetchEvents();
    const CALENDAR_RESPONSIVE = {
      small: {
        breakpoint: '(max-width: 576px)',
        daysInWeek: 2,
      },
      medium: {
        breakpoint: '(max-width: 768px)',
        daysInWeek: 3,
      },
      large: {
        breakpoint: '(max-width: 960px)',
        daysInWeek: 5,
      },
    };
    this.breakpointObserver
      .observe(
        Object.values(CALENDAR_RESPONSIVE).map(({breakpoint}) => breakpoint)
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: BreakpointState) => {
        const foundBreakpoint = Object.values(CALENDAR_RESPONSIVE).find(
          ({breakpoint}) => !!state.breakpoints[breakpoint]
        );
        if (foundBreakpoint) {
          this.daysInWeek = foundBreakpoint.daysInWeek;
        } else {
          this.daysInWeek = 7;
        }
        this.cd.markForCheck();
      });

  }

  public fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: addDays,
      day: startOfDay,
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];

    const params = new HttpParams()
      .set('start[after]', format(getStart(this.viewDate), 'yyyy-MM-dd HH:mm:ss')
      )
      .set('end[before]', format(getEnd(this.viewDate), 'yyyy-MM-dd HH:mm:ss')
      );
    this.events$ = this.http.get(`${environment.apiUrl}/shifts.json`, {
      params, headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      map((results: ScheduledShift[]) => {
        return results.map((shift: ScheduledShift) => {
          return {
            id: shift.id,
            title: shift.onDuty.firstName + ' ' + shift.ShiftStatus,
            start: new Date(shift.start),
            end: new Date(shift.end),
            allDay: false,
            colors: shift.ShiftStatus,
            meta: {
              shift,
            },
          };
        });
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }


  dayClicked({
               date,
               events,
             }: {
    date: Date;
    events: CalendarEvent<{ shift: ScheduledShift }>[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ shift: ScheduledShift }>): void {
    const id = event.meta.shift.id;
    this.router.navigateByUrl(`/shifts/${id}/details`);
  }
}
