import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule, IonicRouteStrategy, NavParams } from "@ionic/angular";
import { HttpClientModule } from "@angular/common/http";
import { ListShiftsPage } from "./list-shifts";
import { ListShiftsPageRoutingModule } from "./list-shifts-routing.module";
import { ComponentsModule } from "../../../../shared/components.module";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { RouteReuseStrategy } from "@angular/router";
import { RouterLink } from "@angular/router";
var ListShiftsModule = /** @class */ (function () {
    function ListShiftsModule() {
    }
    ListShiftsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                ListShiftsPageRoutingModule,
                ComponentsModule,
                HttpClientModule
            ],
            declarations: [
                ListShiftsPage
            ],
            bootstrap: [ListShiftsPage],
            providers: [StatusBar, RouterLink, NavParams,
                SplashScreen,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }]
        })
    ], ListShiftsModule);
    return ListShiftsModule;
}());
export { ListShiftsModule };
//# sourceMappingURL=list-shifts.module.js.map