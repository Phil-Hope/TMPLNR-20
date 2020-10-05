import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomePage } from "./welcome";
var routes = [
    {
        path: '',
        component: WelcomePage
    }
];
var WelcomeRoutingModule = /** @class */ (function () {
    function WelcomeRoutingModule() {
    }
    WelcomeRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], WelcomeRoutingModule);
    return WelcomeRoutingModule;
}());
export { WelcomeRoutingModule };
//# sourceMappingURL=welcome-routing.module.js.map