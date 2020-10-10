import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPendingSecondaryShiftsPageRoutingModule } from './list-pending-secondary-shifts-routing.module';

import { ListPendingSecondaryShiftsPage } from './list-pending-secondary-shifts.page';
import {ComponentsModule} from "../../../../../shared/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListPendingSecondaryShiftsPageRoutingModule,
        ComponentsModule
    ],
  declarations: [ListPendingSecondaryShiftsPage]
})
export class ListPendingSecondaryShiftsPageModule {}
