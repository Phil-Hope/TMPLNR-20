import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {AdminPage} from "./admin";
import {AdminPageRoutingModule} from "./admin-routing.module";
import {ComponentsModule} from "../../shared/components.module";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpConfigInterceptor} from "../../services/http.interceptor";
import {ShiftsService} from "../shifts/services/shifts.service";
import {UsersService} from "./users/services/users.service";
import {AuthenticationService} from "../../services/authentication.service";
import {ApproveShiftModule} from "./shifts/approve-shift/approve-shift.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AdminPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    ApproveShiftModule
  ],
  declarations: [AdminPage],
  entryComponents: [AdminPage],
  bootstrap: [AdminPage],
  providers: [
    ShiftsService,
    UsersService,
    AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true}]
})
export class AdminPageModule {
}
