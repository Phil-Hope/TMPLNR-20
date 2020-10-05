import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminPage } from "./admin";
var routes = [
    {
        path: '',
        component: AdminPage
    }
];
var AdminPageRoutingModule = /** @class */ (function () {
    function AdminPageRoutingModule() {
    }
    AdminPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], AdminPageRoutingModule);
    return AdminPageRoutingModule;
}());
export { AdminPageRoutingModule };
//# sourceMappingURL=admin-routing.module.js.map