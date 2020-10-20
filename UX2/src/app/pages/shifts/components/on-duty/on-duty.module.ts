import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {OnDutyPageRoutingModule} from './on-duty-routing.module';
import {OnDutyPage} from './on-duty.page';
import {UsersService} from "../../../admin/users/services/users.service";
import {ComponentsModule} from "../../../../shared/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnDutyPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OnDutyPage],
  providers: [UsersService]
})
export class OnDutyPageModule {
}
