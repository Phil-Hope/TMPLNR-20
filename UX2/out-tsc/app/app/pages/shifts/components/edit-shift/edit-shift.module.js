import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { EditShiftPage } from "./edit-shift";
import { HttpClientModule } from "@angular/common/http";
import { EditShiftPageRoutingModule } from "./edit-shift-routing.module";
import { ComponentsModule } from "../../../../shared/components.module";
import { ReactiveFormsModule } from "@angular/forms";
var EditShiftPageModule = /** @class */ (function () {
    function EditShiftPageModule() {
    }
    EditShiftPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                EditShiftPageRoutingModule,
                ComponentsModule,
                HttpClientModule,
                ReactiveFormsModule
            ],
            declarations: [
                EditShiftPage
            ]
        })
    ], EditShiftPageModule);
    return EditShiftPageModule;
}());
export { EditShiftPageModule };
//# sourceMappingURL=edit-shift.module.js.map