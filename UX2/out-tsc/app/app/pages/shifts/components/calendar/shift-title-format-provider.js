import { __decorate, __extends, __param } from "tslib";
import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter } from 'angular-calendar';
import { formatDate } from '@angular/common';
var ShiftTitleFormatProvider = /** @class */ (function (_super) {
    __extends(ShiftTitleFormatProvider, _super);
    function ShiftTitleFormatProvider(locale) {
        var _this = _super.call(this) || this;
        _this.locale = locale;
        return _this;
    }
    // you can override any of the methods defined in the parent class
    ShiftTitleFormatProvider.prototype.month = function (event) {
        return "<b>" + formatDate(event.start, 'h:m a', this.locale) + " " + formatDate(event.end, 'h:m a', this.locale) + "</b> " + event.title;
    };
    ShiftTitleFormatProvider.prototype.week = function (event) {
        return "<b>" + formatDate(event.start, 'h:m a', this.locale) + " " + formatDate(event.end, 'h:m a', this.locale) + "</b> " + event.title;
    };
    ShiftTitleFormatProvider.prototype.day = function (event) {
        return "<b>" + formatDate(event.start, 'h:m a', this.locale) + " " + formatDate(event.end, 'h:m a', this.locale) + "</b> " + event.title;
    };
    ShiftTitleFormatProvider = __decorate([
        Injectable(),
        __param(0, Inject(LOCALE_ID))
    ], ShiftTitleFormatProvider);
    return ShiftTitleFormatProvider;
}(CalendarEventTitleFormatter));
export { ShiftTitleFormatProvider };
//# sourceMappingURL=shift-title-format-provider.js.map