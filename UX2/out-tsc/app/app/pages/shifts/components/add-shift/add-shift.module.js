import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from "@angular/common/http";
import { ComponentsModule } from "../../../../shared/components.module";
import { AddShiftPage } from "./add-shift";
import { AddShiftRoutingModule } from "./add-shift-routing.module";
var AddShiftModule = /** @class */ (function () {
    function AddShiftModule() {
    }
    AddShiftModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                AddShiftRoutingModule,
                ComponentsModule,
                HttpClientModule,
                ReactiveFormsModule
            ],
            declarations: [AddShiftPage],
            bootstrap: [AddShiftPage]
        })
    ], AddShiftModule);
    return AddShiftModule;
}());
export { AddShiftModule };
//# sourceMappingURL=add-shift.module.js.map