import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ComponentsModule} from "../../../../../shared/components.module";
import {IonicModule} from '@ionic/angular';

import {ListApprovedShiftsPageRoutingModule} from './list-approved-shifts-routing.module';

import {ListApprovedShiftsPage} from './list-approved-shifts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ListApprovedShiftsPageRoutingModule
  ],
  declarations: [ListApprovedShiftsPage]
})
export class ListApprovedShiftsPageModule {
}
