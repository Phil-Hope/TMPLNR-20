import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { HomePage } from "./container/home";
import { HomePageRoutingModule } from "./home-routing.module";
import { ComponentsModule } from "../../shared/components.module";
var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                HomePageRoutingModule,
                ComponentsModule
            ],
            declarations: [
                HomePage
            ],
            bootstrap: [HomePage]
        })
    ], HomePageModule);
    return HomePageModule;
}());
export { HomePageModule };
//# sourceMappingURL=home.module.js.map