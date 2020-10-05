import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UsersPage } from "./container/users";
var routes = [
    {
        path: '',
        component: UsersPage
    }
];
var UsersRoutingModule = /** @class */ (function () {
    function UsersRoutingModule() {
    }
    UsersRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], UsersRoutingModule);
    return UsersRoutingModule;
}());
export { UsersRoutingModule };
//# sourceMappingURL=users-routing.module.js.map