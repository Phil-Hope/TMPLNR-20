import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { DeleteShiftPageRoutingModule } from "./delete-shift-routing.module";
import { DeleteShiftPage } from "./delete-shift";
import { ComponentsModule } from "../../../../shared/components.module";
var DeleteShiftPageModule = /** @class */ (function () {
    function DeleteShiftPageModule() {
    }
    DeleteShiftPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                FormsModule,
                DeleteShiftPageRoutingModule,
                ComponentsModule
            ],
            declarations: [
                DeleteShiftPage
            ]
        })
    ], DeleteShiftPageModule);
    return DeleteShiftPageModule;
}());
export { DeleteShiftPageModule };
//# sourceMappingURL=delete-shift.module.js.map