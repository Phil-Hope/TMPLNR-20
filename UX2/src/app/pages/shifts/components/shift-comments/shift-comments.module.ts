import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ShiftCommentsPage } from "./shift-comments";
import { ShiftCommentsRoutingModule } from "./shift-comments-routing.module";
import { ComponentsModule } from "../../../../shared/components.module";
import {ShiftsService} from "../../services/shifts.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpConfigInterceptor} from "../../../../services/http.interceptor";

@NgModule({
  imports:
  [
    CommonModule,
    IonicModule,
    ShiftCommentsRoutingModule,
    ComponentsModule
],
  declarations: [
    ShiftCommentsPage
  ],
  bootstrap: [ShiftCommentsPage],
  providers: [
    ShiftsService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class ShiftCommentsPageModule { }
