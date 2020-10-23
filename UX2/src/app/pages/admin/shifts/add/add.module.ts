import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AddPageRoutingModule} from './add-routing.module';
import {AddPage} from './add.page';
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {ComponentsModule} from "../../../../shared/components.module";
import {UsersService} from "../../users/services/users.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [AddPage],
  providers: [ShiftsService, UsersService]
})
export class AddPageModule {
}
