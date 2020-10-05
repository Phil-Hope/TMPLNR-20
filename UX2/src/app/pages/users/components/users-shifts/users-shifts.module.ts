import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {UsersShiftsRoutingModule} from "./users-shifts-routing.module";
import {UsersShiftsPage} from "./users-shifts";
import {ComponentsModule} from "../../../../shared/components.module";
import {AuthenticationService} from "../../../../services/authentication.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpConfigInterceptor} from "../../../../services/http.interceptor";
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {UsersService} from "../../services/users.service";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    UsersShiftsRoutingModule,
    ComponentsModule
  ],
  declarations: [UsersShiftsPage],
  providers: [
    AuthenticationService,
    ShiftsService,
    UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class UsersShiftsModule { }
