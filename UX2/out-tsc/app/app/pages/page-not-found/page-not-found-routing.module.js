import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PageNotFoundPage } from "./page-not-found";
var routes = [
    {
        path: '',
        component: PageNotFoundPage
    }
];
var PageNotFoundRoutingModule = /** @class */ (function () {
    function PageNotFoundRoutingModule() {
    }
    PageNotFoundRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], PageNotFoundRoutingModule);
    return PageNotFoundRoutingModule;
}());
export { PageNotFoundRoutingModule };
//# sourceMappingURL=page-not-found-routing.module.js.map