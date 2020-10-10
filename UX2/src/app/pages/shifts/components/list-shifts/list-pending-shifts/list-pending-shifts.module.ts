import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPendingShiftsPageRoutingModule } from './list-pending-shifts-routing.module';

import { ListPendingShiftsPage } from './list-pending-shifts.page';
import {ComponentsModule} from "../../../../../shared/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListPendingShiftsPageRoutingModule,
        ComponentsModule
    ],
  declarations: [ListPendingShiftsPage]
})
export class ListPendingShiftsPageModule {}
