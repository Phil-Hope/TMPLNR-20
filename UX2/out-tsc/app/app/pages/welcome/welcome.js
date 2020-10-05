import { __awaiter, __decorate, __generator } from "tslib";
import { Component, ViewChild } from "@angular/core";
import { IonSlides } from '@ionic/angular';
import { WELCOME_KEY } from "../../guards/welcome.guard";
import { Plugins } from '@capacitor/core';
var Storage = Plugins.Storage;
var WelcomePage = /** @class */ (function () {
    function WelcomePage(menu, router) {
        this.menu = menu;
        this.router = router;
        this.showSkip = true;
    }
    WelcomePage.prototype.ngOnInit = function () {
    };
    WelcomePage.prototype.next = function () {
        this.slides.slideNext();
    };
    WelcomePage.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Storage.set({ key: WELCOME_KEY, value: 'true' })];
                    case 1:
                        _a.sent();
                        this.router.navigateByUrl('login', { replaceUrl: true });
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        ViewChild(IonSlides)
    ], WelcomePage.prototype, "slides", void 0);
    WelcomePage = __decorate([
        Component({
            selector: 'app-welcome-page',
            templateUrl: './welcome.html',
            styleUrls: ['./welcome.scss']
        })
    ], WelcomePage);
    return WelcomePage;
}());
export { WelcomePage };
//# sourceMappingURL=welcome.js.map