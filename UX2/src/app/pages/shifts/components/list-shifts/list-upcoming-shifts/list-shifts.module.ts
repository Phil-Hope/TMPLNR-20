import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {IonicModule, IonicRouteStrategy, NavParams} from "@ionic/angular";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ListShiftsPage } from "./list-shifts";
import { ListShiftsPageRoutingModule } from "./list-shifts-routing.module";
import { ComponentsModule } from "../../../../../shared/components.module";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {RouteReuseStrategy} from "@angular/router";
import {RouterLink} from "@angular/router";
import {ShiftsService} from "../../../services/shifts.service";
import {AuthenticationService} from "../../../../../services/authentication.service";

@NgModule({
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
  providers: [
    StatusBar,
    RouterLink,
    NavParams,
    ShiftsService,
    AuthenticationService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ]
})
export class ListShiftsModule { }
