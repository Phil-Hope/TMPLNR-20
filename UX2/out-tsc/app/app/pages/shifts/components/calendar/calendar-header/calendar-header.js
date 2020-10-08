import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';
var CalendarHeaderComponent = /** @class */ (function () {
    function CalendarHeaderComponent() {
        this.locale = 'en';
        this.viewChange = new EventEmitter();
        this.viewDateChange = new EventEmitter();
        this.CalendarView = CalendarView;
    }
    __decorate([
        Input()
    ], CalendarHeaderComponent.prototype, "view", void 0);
    __decorate([
        Input()
    ], CalendarHeaderComponent.prototype, "viewDate", void 0);
    __decorate([
        Input()
    ], CalendarHeaderComponent.prototype, "locale", void 0);
    __decorate([
        Output()
    ], CalendarHeaderComponent.prototype, "viewChange", void 0);
    __decorate([
        Output()
    ], CalendarHeaderComponent.prototype, "viewDateChange", void 0);
    CalendarHeaderComponent = __decorate([
        Component({
            selector: 'app-draft-calendar-toolbar',
            styleUrls: ['./draft-calendar-toolbar.scss'],
            templateUrl: './draft-calendar-toolbar.html'
        })
    ], CalendarHeaderComponent);
    return CalendarHeaderComponent;
}());
export { CalendarHeaderComponent };
//# sourceMappingURL=draft-calendar-toolbar.js.map
