import { __awaiter, __decorate, __generator } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from "rxjs";
var AppComponent = /** @class */ (function () {
    function AppComponent(menu, platform, router, splashScreen, statusBar, storage, swUpdate, toastCtrl, authService) {
        this.menu = menu;
        this.platform = platform;
        this.router = router;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.storage = storage;
        this.swUpdate = swUpdate;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.dark = false;
        this.isAuthenticated = new BehaviorSubject(null);
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    AppComponent.prototype.logOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.logout()];
                    case 1:
                        _a.sent();
                        this.router.navigateByUrl('/home', { replaceUrl: true });
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.scss'],
            encapsulation: ViewEncapsulation.None
        })
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map