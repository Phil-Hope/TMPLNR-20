import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { ListUsersRoutingModule } from "./list-users-routing.module";
import { ListUsersPage } from "./list-users";
import { HttpClientModule } from "@angular/common/http";
import { ComponentsModule } from "../../../../shared/components.module";
var ListUsersModule = /** @class */ (function () {
    function ListUsersModule() {
    }
    ListUsersModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                ListUsersRoutingModule,
                ComponentsModule,
                HttpClientModule
            ],
            declarations: [
                ListUsersPage
            ]
        })
    ], ListUsersModule);
    return ListUsersModule;
}());
export { ListUsersModule };
//# sourceMappingURL=list-users.module.js.map