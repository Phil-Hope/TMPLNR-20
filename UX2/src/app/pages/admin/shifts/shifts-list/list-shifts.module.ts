import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule, NavParams} from "@ionic/angular";
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {UsersService} from "../../users/services/users.service";
import {AdminListShiftsPage} from "./list-shifts";
import {ListShiftsRoutingModule} from "./list-shifts-routing.module";
import {AuthenticationService} from "../../../../authentication/authentication.service";
import {ComponentsModule} from "../../../../shared/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpConfigInterceptor} from "../../../../services/http.interceptor";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ListShiftsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminListShiftsPage
  ],
  providers: [
    ShiftsService,
    UsersService,
    AuthenticationService,
    NavParams,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class ListShiftsModule { }
