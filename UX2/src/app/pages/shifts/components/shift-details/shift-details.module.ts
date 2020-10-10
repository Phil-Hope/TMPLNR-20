import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ShiftDetailsPage } from "./shift-details";
import { ShiftDetailsRoutingModule } from "./shift-details-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {ComponentsModule} from "../../../../shared/components.module";
import {ShiftsService} from "../../services/shifts.service";
import {AuthenticationService} from "../../../../services/authentication.service";

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
  ]
})
export class ShiftDetailsModule { }
