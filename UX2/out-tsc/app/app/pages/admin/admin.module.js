import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { AdminPage } from "./admin";
import { AdminPageRoutingModule } from "./admin-routing.module";
import { ComponentsModule } from "../../shared/components.module";
var AdminPageModule = /** @class */ (function () {
    function AdminPageModule() {
    }
    AdminPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                AdminPageRoutingModule,
                ComponentsModule
            ],
            declarations: [AdminPage],
            entryComponents: [AdminPage],
            bootstrap: [AdminPage]
        })
    ], AdminPageModule);
    return AdminPageModule;
}());
export { AdminPageModule };
//# sourceMappingURL=admin.module.js.map