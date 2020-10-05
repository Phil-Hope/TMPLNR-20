import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ShiftCommentsPage } from "./shift-comments";
var routes = [
    {
        path: '',
        component: ShiftCommentsPage
    }
];
var ShiftCommentsRoutingModule = /** @class */ (function () {
    function ShiftCommentsRoutingModule() {
    }
    ShiftCommentsRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ShiftCommentsRoutingModule);
    return ShiftCommentsRoutingModule;
}());
export { ShiftCommentsRoutingModule };
//# sourceMappingURL=shift-comments-routing.module.js.map