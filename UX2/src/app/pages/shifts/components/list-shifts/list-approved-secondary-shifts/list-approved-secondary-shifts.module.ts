import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListApprovedSecondaryShiftsPageRoutingModule } from './list-approved-secondary-shifts-routing.module';

import { ListApprovedSecondaryShiftsPage } from './list-approved-secondary-shifts.page';
import {ComponentsModule} from "../../../../../shared/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListApprovedSecondaryShiftsPageRoutingModule,
        ComponentsModule
    ],
  declarations: [ListApprovedSecondaryShiftsPage]
})
export class ListApprovedSecondaryShiftsPageModule {}
