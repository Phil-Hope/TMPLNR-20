import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPage } from "./login";
var routes = [
    {
        path: '',
        component: LoginPage
    }
];
var LoginPageRoutingModule = /** @class */ (function () {
    function LoginPageRoutingModule() {
    }
    LoginPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], LoginPageRoutingModule);
    return LoginPageRoutingModule;
}());
export { LoginPageRoutingModule };
//# sourceMappingURL=login-routing.module.js.map