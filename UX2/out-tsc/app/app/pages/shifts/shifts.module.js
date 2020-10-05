import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ShiftsPage } from "./container/shifts";
import { ShiftsRoutingModule } from "./shifts-routing.module";
import { ComponentsModule } from "../../shared/components.module";
var ShiftsModule = /** @class */ (function () {
    function ShiftsModule() {
    }
    ShiftsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                ShiftsRoutingModule,
                ComponentsModule
            ],
            declarations: [
                ShiftsPage
            ]
        })
    ], ShiftsModule);
    return ShiftsModule;
}());
export { ShiftsModule };
//# sourceMappingURL=shifts.module.js.map