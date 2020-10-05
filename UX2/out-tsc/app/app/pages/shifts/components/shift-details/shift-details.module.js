import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ShiftDetailsPage } from "./shift-details";
import { ShiftDetailsRoutingModule } from "./shift-details-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ComponentsModule } from "../../../../shared/components.module";
var ShiftDetailsModule = /** @class */ (function () {
    function ShiftDetailsModule() {
    }
    ShiftDetailsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                ShiftDetailsRoutingModule,
                ComponentsModule,
                HttpClientModule
            ],
            declarations: [
                ShiftDetailsPage
            ]
        })
    ], ShiftDetailsModule);
    return ShiftDetailsModule;
}());
export { ShiftDetailsModule };
//# sourceMappingURL=shift-details.module.js.map