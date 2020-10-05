import { __awaiter, __decorate, __generator } from "tslib";
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
var Storage = Plugins.Storage;
export var WELCOME_KEY = 'welcome_seen';
var WelcomeGuard = /** @class */ (function () {
    function WelcomeGuard(router) {
        this.router = router;
    }
    WelcomeGuard.prototype.canLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hasSeenWelcome;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Storage.get({ key: WELCOME_KEY })];
                    case 1:
                        hasSeenWelcome = _a.sent();
                        if (hasSeenWelcome && (hasSeenWelcome.value === 'true')) {
                            return [2 /*return*/, true];
                        }
                        else {
                            this.router.navigateByUrl('./welcome', { replaceUrl: true });
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WelcomeGuard = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], WelcomeGuard);
    return WelcomeGuard;
}());
export { WelcomeGuard };
//# sourceMappingURL=welcome.guard.js.map