import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { map } from "rxjs/operators";
import { format } from "date-fns";
var ListShiftsPage = /** @class */ (function () {
    function ListShiftsPage(router, http, navCtrl, navParams, modalController) {
        this.router = router;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalController = modalController;
        this.date = new Date();
    }
    ListShiftsPage.prototype.onSelect = function (shift) {
        this.selectedShift = shift;
    };
    ListShiftsPage.prototype.ngOnInit = function () {
        this.loadShifts().subscribe(function (data) { return (data); });
        this.shifts = this.loadShifts();
    };
    ListShiftsPage.prototype.loadShifts = function () {
        var params = new HttpParams()
            .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
            .set('order[start]', 'ASC');
        return this.http.get(environment.apiUrl + "/shifts.json", { params: params })
            .pipe(map(function (data) { return data; }));
    };
    ListShiftsPage = __decorate([
        Component({
            selector: 'app-list-shifts',
            templateUrl: './list-shifts.html',
            styleUrls: ['./list-shifts.scss'],
        })
    ], ListShiftsPage);
    return ListShiftsPage;
}());
export { ListShiftsPage };
//# sourceMappingURL=list-shifts.js.map