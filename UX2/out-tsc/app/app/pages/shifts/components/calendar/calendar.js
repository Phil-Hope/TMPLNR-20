import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Injectable } from "@angular/core";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { ShiftTitleFormatProvider } from "./shift-title-format-provider";
import { CalendarDateFormatter, CalendarEventTitleFormatter, CalendarView } from 'angular-calendar';
import { Subject } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { map, takeUntil } from "rxjs/operators";
import { addDays, endOfDay, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfDay, startOfMonth } from 'date-fns';
import { CustomDateFormatProvider } from "./custom-date-format.provider";
var CalendarPage = /** @class */ (function () {
    function CalendarPage(http, router, breakpointObserver, cd) {
        this.http = http;
        this.router = router;
        this.breakpointObserver = breakpointObserver;
        this.cd = cd;
        this.view = CalendarView.Month;
        this.viewDate = new Date();
        this.daysInWeek = 7;
        this.id = '';
        this.actions = [];
        this.destroy$ = new Subject();
    }
    CalendarPage.prototype.changeDay = function (date) {
        this.viewDate = date;
        this.view = CalendarView.Day;
    };
    CalendarPage.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchEvents();
        var CALENDAR_RESPONSIVE = {
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
            .observe(Object.values(CALENDAR_RESPONSIVE).map(function (_a) {
            var breakpoint = _a.breakpoint;
            return breakpoint;
        }))
            .pipe(takeUntil(this.destroy$))
            .subscribe(function (state) {
            var foundBreakpoint = Object.values(CALENDAR_RESPONSIVE).find(function (_a) {
                var breakpoint = _a.breakpoint;
                return !!state.breakpoints[breakpoint];
            });
            if (foundBreakpoint) {
                _this.daysInWeek = foundBreakpoint.daysInWeek;
            }
            else {
                _this.daysInWeek = 7;
            }
            _this.cd.markForCheck();
        });
    };
    CalendarPage.prototype.fetchEvents = function () {
        var getStart = {
            month: startOfMonth,
            week: addDays,
            day: startOfDay,
        }[this.view];
        var getEnd = {
            month: endOfMonth,
            week: endOfWeek,
            day: endOfDay,
        }[this.view];
        var params = new HttpParams()
            .set('start[after]', format(getStart(this.viewDate), 'yyyy-MM-dd HH:mm:ss'))
            .set('end[before]', format(getEnd(this.viewDate), 'yyyy-MM-dd HH:mm:ss'));
        this.events$ = this.http.get(environment.apiUrl + "/shifts.json", {
            params: params,
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(map(function (results) {
            return results.map(function (shift) {
                return {
                    id: shift.id,
                    title: shift.onDuty.firstName + ' ' + shift.ShiftStatus,
                    start: new Date(shift.start),
                    end: new Date(shift.end),
                    allDay: false,
                    colors: shift.ShiftStatus,
                    meta: {
                        shift: shift,
                    },
                };
            });
        }));
    };
    CalendarPage.prototype.ngOnDestroy = function () {
        this.destroy$.next();
    };
    CalendarPage.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    };
    CalendarPage.prototype.eventClicked = function (event) {
        this.id = event.meta.shift.id;
        this.router.navigateByUrl("shifts/" + this.id + "/details", { replaceUrl: true });
    };
    CalendarPage = __decorate([
        Injectable(),
        Component({
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
    ], CalendarPage);
    return CalendarPage;
}());
export { CalendarPage };
//# sourceMappingURL=calendar.js.map