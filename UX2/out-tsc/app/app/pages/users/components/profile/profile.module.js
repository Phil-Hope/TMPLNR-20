import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ProfilePage } from "./profile";
import { HttpClientModule } from "@angular/common/http";
import { ProfilePageRoutingModule } from "./profile-routing.module";
import { ComponentsModule } from "../../../../shared/components.module";
var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                ProfilePageRoutingModule,
                ComponentsModule,
                HttpClientModule
            ],
            declarations: [
                ProfilePage
            ],
            bootstrap: [ProfilePage]
        })
    ], ProfileModule);
    return ProfileModule;
}());
export { ProfileModule };
//# sourceMappingURL=profile.module.js.map