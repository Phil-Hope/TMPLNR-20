import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileShiftsPageRoutingModule } from './profile-shifts-routing.module';
import { ProfileShiftsPage } from './profile-shifts.page';
import {ShiftsService} from "../../shifts/services/shifts.service";
import {AuthenticationService} from "../../../authentication/authentication.service";
import {UsersService} from "../../admin/users/services/users.service";
import {ComponentsModule} from "../../../shared/components.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpConfigInterceptor} from "../../../services/http.interceptor";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileShiftsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProfileShiftsPage],
  providers: [ShiftsService, AuthenticationService, UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ]
})
export class ProfileShiftsPageModule {}
