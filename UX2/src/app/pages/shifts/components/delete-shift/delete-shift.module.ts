import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DeleteShiftPageRoutingModule } from "./delete-shift-routing.module";
import { DeleteShiftPage } from "./delete-shift";
import {ComponentsModule} from "../../../../shared/components.module";
import {ShiftsService} from "../../services/shifts.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        DeleteShiftPageRoutingModule,
        ComponentsModule,
        ReactiveFormsModule
    ],
  declarations: [
    DeleteShiftPage
  ],
  providers: [
    ShiftsService,
    AuthenticationService,
  ]
})
export class DeleteShiftPageModule { }
