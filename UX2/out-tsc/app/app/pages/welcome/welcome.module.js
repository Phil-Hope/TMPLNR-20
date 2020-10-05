import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from "@ionic/storage";
import { WelcomePage } from "./welcome";
import { WelcomeRoutingModule } from "./welcome-routing.module";
var WelcomeModule = /** @class */ (function () {
    function WelcomeModule() {
    }
    WelcomeModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                WelcomeRoutingModule,
                IonicStorageModule
            ],
            declarations: [WelcomePage],
            entryComponents: [WelcomePage],
        })
    ], WelcomeModule);
    return WelcomeModule;
}());
export { WelcomeModule };
//# sourceMappingURL=welcome.module.js.map