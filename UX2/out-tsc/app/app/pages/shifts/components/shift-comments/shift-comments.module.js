import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ShiftCommentsPage } from "./shift-comments";
import { ShiftCommentsRoutingModule } from "./shift-comments-routing.module";
import { ComponentsModule } from "../../../../shared/components.module";
var ShiftCommentsPageModule = /** @class */ (function () {
    function ShiftCommentsPageModule() {
    }
    ShiftCommentsPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                ShiftCommentsRoutingModule,
                ComponentsModule
            ],
            declarations: [
                ShiftCommentsPage
            ],
            bootstrap: [ShiftCommentsPage]
        })
    ], ShiftCommentsPageModule);
    return ShiftCommentsPageModule;
}());
export { ShiftCommentsPageModule };
//# sourceMappingURL=shift-comments.module.js.map