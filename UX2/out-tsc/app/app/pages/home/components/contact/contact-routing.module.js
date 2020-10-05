import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ContactPage } from "./contact";
var routes = [
    {
        path: '',
        component: ContactPage
    }
];
var ContactRoutingModule = /** @class */ (function () {
    function ContactRoutingModule() {
    }
    ContactRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ContactRoutingModule);
    return ContactRoutingModule;
}());
export { ContactRoutingModule };
//# sourceMappingURL=contact-routing.module.js.map