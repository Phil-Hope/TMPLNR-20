import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { tap } from "rxjs/operators";
var AddShiftPage = /** @class */ (function () {
    function AddShiftPage(fb, http) {
        this.fb = fb;
        this.http = http;
        this.submitted = false;
        this.loading = false;
    }
    AddShiftPage.prototype.ngOnInit = function () {
        this.users = this.http.get(environment.apiUrl + "/users.json");
        this.form = this.fb.group({
            start: ['', Validators.required],
            end: ['', Validators.required],
            onDuty: ['', Validators.required],
            ShiftStatus: ['', Validators.required],
            isApproved: [false, Validators.required]
        });
    };
    Object.defineProperty(AddShiftPage.prototype, "f", {
        get: function () { return this.form.controls; },
        enumerable: false,
        configurable: true
    });
    AddShiftPage.prototype.addShift = function () {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.http.post(environment.apiUrl + "/shifts", {
            start: this.f.start.value,
            end: this.f.end.value,
            onDuty: this.f.onDuty.value,
            ShiftStatus: this.f.ShiftStatus.value,
            isApproved: this.f.isApproved.value,
        }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }), withCredentials: true
        }).
            pipe(tap(function (_) { return alert('New Shift Created Successfully!'); }))
            .subscribe(function (data) { return console.log(data); });
    };
    AddShiftPage = __decorate([
        Component({
            selector: 'app-add-shift',
            templateUrl: './add-shift.html',
            styleUrls: ['./add-shift.scss'],
        })
    ], AddShiftPage);
    return AddShiftPage;
}());
export { AddShiftPage };
//# sourceMappingURL=add-shift.js.map