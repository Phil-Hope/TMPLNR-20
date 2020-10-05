import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { map } from "rxjs/operators";
var ShiftDetailsPage = /** @class */ (function () {
    function ShiftDetailsPage(route, router, http) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.date = new Date();
    }
    ShiftDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.route.snapshot.paramMap.get('id');
        this.getShift(id).subscribe(function (shift) { return _this.shift = shift; });
    };
    ShiftDetailsPage.prototype.getShift = function () {
        return this.http.get(environment.apiUrl + "/shifts/" + this.id + ".json", { headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }), withCredentials: true
        }).pipe(map(function (data) { return data; }));
    };
    ShiftDetailsPage = __decorate([
        Component({
            selector: 'app-shift-details',
            templateUrl: './shift-details.html',
            styleUrls: ['./shift-details.scss'],
        })
    ], ShiftDetailsPage);
    return ShiftDetailsPage;
}());
export { ShiftDetailsPage };
//# sourceMappingURL=shift-details.js.map
