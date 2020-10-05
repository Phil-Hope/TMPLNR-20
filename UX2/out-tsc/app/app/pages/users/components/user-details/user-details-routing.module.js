import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserDetailsPage } from "./user-details";
var routes = [
    {
        path: '',
        component: UserDetailsPage
    }
];
var UserDetailsRoutingModule = /** @class */ (function () {
    function UserDetailsRoutingModule() {
    }
    UserDetailsRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], UserDetailsRoutingModule);
    return UserDetailsRoutingModule;
}());
export { UserDetailsRoutingModule };
//# sourceMappingURL=user-details-routing.module.js.map