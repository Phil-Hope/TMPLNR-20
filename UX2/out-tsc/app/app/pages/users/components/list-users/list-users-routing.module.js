import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { ListUsersPage } from "./list-users";
var routes = [
    {
        path: '',
        component: ListUsersPage
    }
];
var ListUsersRoutingModule = /** @class */ (function () {
    function ListUsersRoutingModule() {
    }
    ListUsersRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ListUsersRoutingModule);
    return ListUsersRoutingModule;
}());
export { ListUsersRoutingModule };
//# sourceMappingURL=list-users-routing.module.js.map