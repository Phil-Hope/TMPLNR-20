import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ShiftDetailsPage } from "./shift-details";
import { ShiftDetailsRoutingModule } from "./shift-details-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ComponentsModule} from "../../../../shared/components.module";
import {ShiftsService} from "../../services/shifts.service";
import {AuthenticationService} from "../../../../authentication/authentication.service";
import {HttpConfigInterceptor} from "../../../../services/http.interceptor";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ShiftDetailsRoutingModule,
    ComponentsModule,
    HttpClientModule
  ],
  declarations: [
    ShiftDetailsPage
  ],
  providers: [
    ShiftsService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class ShiftDetailsModule { }
