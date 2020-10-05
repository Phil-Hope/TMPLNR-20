import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { map } from "rxjs/operators";
var ProfilePage = /** @class */ (function () {
    function ProfilePage(http, route, router) {
        this.http = http;
        this.route = route;
        this.router = router;
    }
    ProfilePage.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.route.snapshot.paramMap.get('id');
        this.getUser().subscribe(function (user) { return _this.user$ = user; });
    };
    ProfilePage.prototype.getUser = function () {
        return this.http.get(environment.apiUrl + "/users/" + this.id + ".json", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }), withCredentials: true
        }).pipe(map(function (data) { return data; }));
    };
    ProfilePage.prototype.viewShiftDetails = function () {
        this.router.navigateByUrl('/shifts/:id/details');
    };
    ProfilePage = __decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.html',
            styleUrls: ['./profile.scss'],
        })
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.js.map