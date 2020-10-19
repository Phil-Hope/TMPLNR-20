import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ProfileUserPageRoutingModule} from './profile-user-routing.module';
import {ProfileUserPage} from './profile-user.page';
import {ComponentsModule} from "../../../shared/components.module";
import {UsersService} from "../../admin/users/services/users.service";
import {ShiftsService} from "../../shifts/services/shifts.service";
import {AuthenticationService} from "../../../authentication/authentication.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpConfigInterceptor} from "../../../services/http.interceptor";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileUserPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [ProfileUserPage],
  providers: [UsersService, ShiftsService, AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class ProfileUserPageModule {
}
