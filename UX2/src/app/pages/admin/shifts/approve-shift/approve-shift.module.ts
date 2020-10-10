import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ComponentsModule} from "../../../../shared/components.module";
import {ApproveShiftPage} from "./approve-shift";
import {IonicModule} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApproveShiftRoutingModule} from "./approve-shift-routing.module";
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {UsersService} from "../../users/services/users.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ApproveShiftRoutingModule
  ],
  declarations: [ApproveShiftPage],
  providers: [ShiftsService, UsersService, AuthenticationService,
  ]
})
export class ApproveShiftModule { }
