import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EditUserPage } from "./edit-user";
var routes = [
    {
        path: '',
        component: EditUserPage
    }
];
var EditUserPageRoutingModule = /** @class */ (function () {
    function EditUserPageRoutingModule() {
    }
    EditUserPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], EditUserPageRoutingModule);
    return EditUserPageRoutingModule;
}());
export { EditUserPageRoutingModule };
//# sourceMappingURL=edit-user-routing.module.js.map