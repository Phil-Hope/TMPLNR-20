import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileShiftsPageRoutingModule } from './profile-shifts-routing.module';
import { ProfileShiftsPage } from './profile-shifts.page';
import {ShiftsService} from "../../shifts/services/shifts.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {UsersService} from "../../admin/users/services/users.service";
import {ComponentsModule} from "../../../shared/components.module";

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
    ]
})
export class ProfileShiftsPageModule {}
