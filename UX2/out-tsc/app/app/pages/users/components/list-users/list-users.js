import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { environment } from "../../../../../environments/environment";
var ListUsersPage = /** @class */ (function () {
    function ListUsersPage(http) {
        this.http = http;
    }
    ListUsersPage.prototype.ngOnInit = function () {
        this.users = this.http.get(environment.apiUrl + "/users.json");
        this.users.subscribe(function (data) { return console.log(data); });
    };
    ListUsersPage = __decorate([
        Component({
            selector: 'app-list-users',
            templateUrl: './list-users.html',
            styleUrls: ['./list-users.scss'],
        })
    ], ListUsersPage);
    return ListUsersPage;
}());
export { ListUsersPage };
//# sourceMappingURL=list-users.js.map