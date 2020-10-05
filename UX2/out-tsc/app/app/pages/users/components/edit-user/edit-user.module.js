import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { EditUserPage } from "./edit-user";
import { EditUserPageRoutingModule } from "./edit-user-routing.module";
import { ComponentsModule } from "../../../../shared/components.module";
var EditUserPageModule = /** @class */ (function () {
    function EditUserPageModule() {
    }
    EditUserPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                EditUserPageRoutingModule,
                ComponentsModule
            ],
            declarations: [
                EditUserPage
            ]
        })
    ], EditUserPageModule);
    return EditUserPageModule;
}());
export { EditUserPageModule };
//# sourceMappingURL=edit-user.module.js.map