import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ShiftDetailsPage } from "./shift-details";
var routes = [
    {
        path: '',
        component: ShiftDetailsPage
    }
];
var ShiftDetailsRoutingModule = /** @class */ (function () {
    function ShiftDetailsRoutingModule() {
    }
    ShiftDetailsRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ShiftDetailsRoutingModule);
    return ShiftDetailsRoutingModule;
}());
export { ShiftDetailsRoutingModule };
//# sourceMappingURL=shift-details-routing.module.js.map