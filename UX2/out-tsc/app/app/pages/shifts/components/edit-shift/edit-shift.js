import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
var EditShiftPage = /** @class */ (function () {
    function EditShiftPage(route, router, http, fb) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.fb = fb;
        this.submitted = false;
        this.loading = false;
    }
    EditShiftPage.prototype.ngOnInit = function () {
        var _this = this;
        this.users = this.http.get(environment.apiUrl + "/users.json");
        this.id = this.route.snapshot.paramMap.get('id');
        this.getShiftForEdit().subscribe(function (shift) { return _this.shift = shift; });
        this.form = this.fb.group({
            start: '',
            end: '',
            onDuty: '',
            ShiftStatus: '',
            isApproved: ''
        });
    };
    EditShiftPage.prototype.getShiftForEdit = function () {
        return this.http.get(environment.apiUrl + "/shifts/" + this.id + ".json", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }), withCredentials: true
        }).pipe(map(function (data) { return data; }));
    };
    Object.defineProperty(EditShiftPage.prototype, "f", {
        get: function () { return this.form.controls; },
        enumerable: false,
        configurable: true
    });
    EditShiftPage.prototype.editShift = function () {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.http.put(environment.apiUrl + "/shifts/" + this.id, {
            start: this.f.start.value,
            finish: this.f.end.value,
            onDuty: this.f.onDuty.value,
            ShiftStatus: this.f.ShiftStatus.value,
            isApproved: this.f.isApproved.value,
        }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }), withCredentials: true
        }).subscribe(function (data) { return (data); });
    };
    EditShiftPage = __decorate([
        Component({
            selector: 'app-edit-shift',
            templateUrl: './edit-shift.html',
            styleUrls: ['./edit-shift.scss'],
        })
    ], EditShiftPage);
    return EditShiftPage;
}());
export { EditShiftPage };
//# sourceMappingURL=edit-shift.js.map