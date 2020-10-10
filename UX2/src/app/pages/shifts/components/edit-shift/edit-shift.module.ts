import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {EditShiftPage} from "./edit-shift";
import {HttpClientModule} from "@angular/common/http";
import {EditShiftPageRoutingModule} from "./edit-shift-routing.module";
import {ComponentsModule} from "../../../../shared/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "../../../../services/authentication.service";
import {ShiftsService} from "../../services/shifts.service";
import {ReactiveTypedFormsModule} from "@rxweb/reactive-form-validators";
import {UsersService} from "../../../admin/users/services/users.service";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditShiftPageRoutingModule,
    ComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ReactiveTypedFormsModule
  ],
  declarations: [
    EditShiftPage
  ],
  providers: [
    AuthenticationService,
    ShiftsService,
      UsersService,
  ]
})
export class EditShiftPageModule {
}
