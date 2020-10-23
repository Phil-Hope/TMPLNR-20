import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from '@ionic/angular';
import {EditPageRoutingModule} from './edit-routing.module';
import {EditPage} from './edit.page';
import {ComponentsModule} from "../../../../shared/components.module";
import {UsersService} from "../../users/services/users.service";
import {ShiftsService} from "../../../shifts/services/shifts.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditPageRoutingModule,
        ReactiveFormsModule,
        ComponentsModule,
    ],
  declarations: [EditPage],
  providers: [UsersService, ShiftsService]

})
export class EditPageModule {
}
