import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AddUserPage } from "./add-user";
var routes = [
    {
        path: '',
        component: AddUserPage
    }
];
var AddUserPageRoutingModule = /** @class */ (function () {
    function AddUserPageRoutingModule() {
    }
    AddUserPageRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forChild(routes),
            ],
            exports: [RouterModule]
        })
    ], AddUserPageRoutingModule);
    return AddUserPageRoutingModule;
}());
export { AddUserPageRoutingModule };
//# sourceMappingURL=add-user-routing.module.js.map