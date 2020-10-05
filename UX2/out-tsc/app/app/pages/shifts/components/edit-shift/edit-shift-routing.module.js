import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EditShiftPage } from "./edit-shift";
var routes = [
    {
        path: '',
        component: EditShiftPage
    }
];
var EditShiftPageRoutingModule = /** @class */ (function () {
    function EditShiftPageRoutingModule() {
    }
    EditShiftPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], EditShiftPageRoutingModule);
    return EditShiftPageRoutingModule;
}());
export { EditShiftPageRoutingModule };
//# sourceMappingURL=edit-shift-routing.module.js.map