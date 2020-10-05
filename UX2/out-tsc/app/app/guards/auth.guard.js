import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { filter, map, take } from "rxjs/operators";
import { Plugins } from "@capacitor/core";
var Storage = Plugins.Storage;
var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canLoad = function () {
        var _this = this;
        return this.authService.isAuthenticated.pipe(filter(function (val) { return val !== null; }), take(1), map(function (isAuthenticated) {
            if (isAuthenticated) {
                return true;
            }
            else {
                _this.router.navigateByUrl('/login');
                return false;
            }
        }));
    };
    AuthGuard = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map