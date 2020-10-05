import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { PageNotFoundPage } from "./page-not-found";
import { PageNotFoundRoutingModule } from "./page-not-found-routing.module";
import { RouterModule } from "@angular/router";
import { ComponentsModule } from "../../shared/components.module";
var PageNotFoundModule = /** @class */ (function () {
    function PageNotFoundModule() {
    }
    PageNotFoundModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                PageNotFoundRoutingModule,
                ComponentsModule,
                RouterModule
            ],
            declarations: [
                PageNotFoundPage
            ]
        })
    ], PageNotFoundModule);
    return PageNotFoundModule;
}());
export { PageNotFoundModule };
//# sourceMappingURL=page-not-found.module.js.map