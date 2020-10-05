import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DeleteUserPage } from "./delete-user";
var routes = [
    {
        path: '',
        component: DeleteUserPage
    }
];
var DeleteUserPageRoutingModule = /** @class */ (function () {
    function DeleteUserPageRoutingModule() {
    }
    DeleteUserPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], DeleteUserPageRoutingModule);
    return DeleteUserPageRoutingModule;
}());
export { DeleteUserPageRoutingModule };
//# sourceMappingURL=delete-user-routing.module.js.map