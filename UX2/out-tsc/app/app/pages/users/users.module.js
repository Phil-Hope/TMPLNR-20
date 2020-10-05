import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { UsersPage } from "./container/users";
import { UsersRoutingModule } from "./users-routing.module";
import { ComponentsModule } from "../../shared/components.module";
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                UsersRoutingModule,
                ComponentsModule
            ],
            declarations: [
                UsersPage
            ]
        })
    ], UsersModule);
    return UsersModule;
}());
export { UsersModule };
//# sourceMappingURL=users.module.js.map