import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DeleteShiftPage } from "./delete-shift";
var routes = [
    {
        path: '',
        component: DeleteShiftPage
    }
];
var DeleteShiftPageRoutingModule = /** @class */ (function () {
    function DeleteShiftPageRoutingModule() {
    }
    DeleteShiftPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], DeleteShiftPageRoutingModule);
    return DeleteShiftPageRoutingModule;
}());
export { DeleteShiftPageRoutingModule };
//# sourceMappingURL=delete-shift-routing.module.js.map