import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ShiftsPage } from "./container/shifts";
var routes = [
    {
        path: '',
        component: ShiftsPage,
    }
];
var ShiftsRoutingModule = /** @class */ (function () {
    function ShiftsRoutingModule() {
    }
    ShiftsRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ShiftsRoutingModule);
    return ShiftsRoutingModule;
}());
export { ShiftsRoutingModule };
//# sourceMappingURL=shifts-routing.module.js.map