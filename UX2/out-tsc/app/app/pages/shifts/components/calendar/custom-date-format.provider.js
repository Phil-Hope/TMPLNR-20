import { __decorate, __extends } from "tslib";
import { CalendarDateFormatter } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
var CustomDateFormatProvider = /** @class */ (function (_super) {
    __extends(CustomDateFormatProvider, _super);
    function CustomDateFormatProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // you can override any of the methods defined in the parent class
    CustomDateFormatProvider.prototype.monthViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return formatDate(date, 'EEE', locale);
    };
    CustomDateFormatProvider.prototype.monthViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return formatDate(date, 'MMM y', locale);
    };
    CustomDateFormatProvider.prototype.weekViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return formatDate(date, 'EEE', locale);
    };
    CustomDateFormatProvider.prototype.dayViewHour = function (_a) {
        var date = _a.date, locale = _a.locale;
        return formatDate(date, 'HH:mm', locale);
    };
    CustomDateFormatProvider = __decorate([
        Injectable()
    ], CustomDateFormatProvider);
    return CustomDateFormatProvider;
}(CalendarDateFormatter));
export { CustomDateFormatProvider };
//# sourceMappingURL=custom-date-format.provider.js.map