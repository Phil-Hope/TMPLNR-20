import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ComponentsModule } from "../../../../shared/components.module";
import { AddShiftPage } from "./add-shift";
import { AddShiftRoutingModule } from "./add-shift-routing.module";
import {AuthenticationService} from "../../../../authentication/authentication.service";
import {ShiftsService} from "../../services/shifts.service";
import {UsersService} from "../../../admin/users/services/users.service";
import {HttpConfigInterceptor} from "../../../../services/http.interceptor";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddShiftRoutingModule,
    ComponentsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [AddShiftPage],
  bootstrap: [AddShiftPage],
  providers: [
    AuthenticationService,
    ShiftsService,
      UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class AddShiftModule { }
