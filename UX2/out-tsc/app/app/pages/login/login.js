import { __awaiter, __decorate, __generator } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';
var Storage = Plugins.Storage;
var LoginPage = /** @class */ (function () {
    function LoginPage(fb, authService, alertController, router, loadingController) {
        this.fb = fb;
        this.authService = authService;
        this.alertController = alertController;
        this.router = router;
        this.loadingController = loadingController;
        this.id = '';
    }
    LoginPage.prototype.ngOnInit = function () {
        this.credentials = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    };
    LoginPage.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create()];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.authService.login(this.credentials.value.email, this.credentials.value.password).subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Storage.get({ key: 'id' })];
                                    case 1:
                                        result = _a.sent();
                                        this.id = JSON.parse(result.value);
                                        return [4 /*yield*/, loading.dismiss()];
                                    case 2:
                                        _a.sent();
                                        if (!result.value) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this.router.navigateByUrl("/users/" + this.id + "/profile", { replaceUrl: true })];
                                    case 3:
                                        _a.sent();
                                        this.isLoggedIn = true;
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }, function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var alert;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, loading.dismiss()];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this.alertController.create({
                                                header: 'Login failed',
                                                message: res.error.error,
                                                buttons: ['OK'],
                                            })];
                                    case 2:
                                        alert = _a.sent();
                                        return [4 /*yield*/, alert.present()];
                                    case 3:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(LoginPage.prototype, "email", {
        get: function () {
            return this.credentials.get('email');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginPage.prototype, "password", {
        get: function () {
            return this.credentials.get('password');
        },
        enumerable: false,
        configurable: true
    });
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.html',
            styleUrls: ['./login.scss'],
        })
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map