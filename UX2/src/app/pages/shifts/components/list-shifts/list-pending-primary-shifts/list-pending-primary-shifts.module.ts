import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPendingPrimaryShiftsPageRoutingModule } from './list-pending-primary-shifts-routing.module';

import { ListPendingPrimaryShiftsPage } from './list-pending-primary-shifts.page';
import {ComponentsModule} from "../../../../../shared/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListPendingPrimaryShiftsPageRoutingModule,
        ComponentsModule
    ],
  declarations: [ListPendingPrimaryShiftsPage]
})
export class ListPendingPrimaryShiftsPageModule {}
