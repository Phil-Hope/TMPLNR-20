import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ResetPasswordPageRoutingModule} from './reset-password-routing.module';
import {ResetPasswordPage} from './reset-password.page';
import {UsersService} from "../../admin/users/services/users.service";
import {ComponentsModule} from "../../../shared/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [ResetPasswordPage],
  providers: [UsersService]
})
export class ResetPasswordPageModule {
}
