import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { DeleteUserPage } from "./delete-user";
import { DeleteUserPageRoutingModule } from "./delete-user-routing.module";
import { ComponentsModule } from "../../../../shared/components.module";
var DeleteUserPageModule = /** @class */ (function () {
    function DeleteUserPageModule() {
    }
    DeleteUserPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                DeleteUserPageRoutingModule,
                ComponentsModule
            ],
            declarations: [
                DeleteUserPage
            ]
        })
    ], DeleteUserPageModule);
    return DeleteUserPageModule;
}());
export { DeleteUserPageModule };
//# sourceMappingURL=delete-user.module.js.map