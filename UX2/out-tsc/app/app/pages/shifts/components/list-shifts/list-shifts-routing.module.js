import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ListShiftsPage } from "./list-shifts";
var routes = [
    {
        path: '',
        component: ListShiftsPage
    }
];
var ListShiftsPageRoutingModule = /** @class */ (function () {
    function ListShiftsPageRoutingModule() {
    }
    ListShiftsPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ListShiftsPageRoutingModule);
    return ListShiftsPageRoutingModule;
}());
export { ListShiftsPageRoutingModule };
//# sourceMappingURL=list-shifts-routing.module.js.map