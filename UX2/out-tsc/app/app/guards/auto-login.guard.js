import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { filter, map, take } from 'rxjs/operators';
var AutoLoginGuard = /** @class */ (function () {
    function AutoLoginGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AutoLoginGuard.prototype.canLoad = function () {
        var _this = this;
        return this.authService.isAuthenticated.pipe(filter(function (val) { return val !== null; }), take(1), map(function (isAuthenticated) {
            console.log('Found previous token, automatic login');
            if (isAuthenticated) {
                _this.router.navigateByUrl('/shifts', { replaceUrl: true });
            }
            else {
                return true;
            }
        }));
    };
    AutoLoginGuard = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], AutoLoginGuard);
    return AutoLoginGuard;
}());
export { AutoLoginGuard };
//# sourceMappingURL=auto-login.guard.js.map