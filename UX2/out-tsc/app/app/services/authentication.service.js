import { __awaiter, __decorate, __generator } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';
import { environment } from "../../environments/environment";
import { Plugins } from "@capacitor/core";
var Storage = Plugins.Storage;
var TOKEN_KEY = 'token';
var ID = 'id';
var USER_ROLES = 'roles';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.isAuthenticated = new BehaviorSubject(null);
        this.token = '';
        this.loadToken();
    }
    AuthenticationService.prototype.loadToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Storage.get({ key: TOKEN_KEY })];
                    case 1:
                        token = _a.sent();
                        if (token && token.value) {
                            console.log('set token:', token.value);
                            this.token = token.value;
                            this.isAuthenticated.next(true);
                        }
                        else {
                            this.isAuthenticated.next(false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationService.prototype.login = function (email, password) {
        var _this = this;
        return this.http.post(environment.apiUrl + "/login", { email: email, password: password }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }), withCredentials: true
        }).pipe(map(function (res) { return (res); }), switchMap(function (token) {
            return from(Storage.set({ key: TOKEN_KEY, value: token.token }))
                && from(Storage.set({ key: ID, value: JSON.stringify(token.data.id) }))
                && from(Storage.set({ key: USER_ROLES, value: token.data.roles }));
        }), tap(function (_) {
            return (_this.isAuthenticated.next(true));
        }));
    };
    AuthenticationService.prototype.logout = function () {
        this.isAuthenticated.next(false);
        return Storage.remove({ key: TOKEN_KEY });
    };
    AuthenticationService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map