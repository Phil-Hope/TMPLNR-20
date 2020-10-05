import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RegisterPage } from "./register";
var routes = [
    {
        path: '',
        component: RegisterPage
    }
];
var RegisterPageRoutingModule = /** @class */ (function () {
    function RegisterPageRoutingModule() {
    }
    RegisterPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], RegisterPageRoutingModule);
    return RegisterPageRoutingModule;
}());
export { RegisterPageRoutingModule };
//# sourceMappingURL=register-routing.module.js.map