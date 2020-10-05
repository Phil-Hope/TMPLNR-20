import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UsersShiftsPage } from "./users-shifts";
var routes = [
    {
        path: '',
        component: UsersShiftsPage
    }
];
var UsersShiftsRoutingModule = /** @class */ (function () {
    function UsersShiftsRoutingModule() {
    }
    UsersShiftsRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], UsersShiftsRoutingModule);
    return UsersShiftsRoutingModule;
}());
export { UsersShiftsRoutingModule };
//# sourceMappingURL=users-shifts-routing.module.js.map