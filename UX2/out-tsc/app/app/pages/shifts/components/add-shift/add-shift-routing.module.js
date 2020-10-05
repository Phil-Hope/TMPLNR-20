import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddShiftPage } from "./add-shift";
var routes = [
    {
        path: '',
        component: AddShiftPage
    }
];
var AddShiftRoutingModule = /** @class */ (function () {
    function AddShiftRoutingModule() {
    }
    AddShiftRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], AddShiftRoutingModule);
    return AddShiftRoutingModule;
}());
export { AddShiftRoutingModule };
//# sourceMappingURL=add-shift-routing.module.js.map