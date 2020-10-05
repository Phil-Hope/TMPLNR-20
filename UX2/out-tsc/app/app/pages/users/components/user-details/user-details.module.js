import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { UserDetailsPage } from "./user-details";
import { UserDetailsRoutingModule } from "./user-details-routing.module";
import { ComponentsModule } from "../../../../shared/components.module";
var UserDetailsModule = /** @class */ (function () {
    function UserDetailsModule() {
    }
    UserDetailsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                UserDetailsRoutingModule,
                ComponentsModule
            ],
            declarations: [
                UserDetailsPage
            ],
            bootstrap: [UserDetailsPage]
        })
    ], UserDetailsModule);
    return UserDetailsModule;
}());
export { UserDetailsModule };
//# sourceMappingURL=user-details.module.js.map