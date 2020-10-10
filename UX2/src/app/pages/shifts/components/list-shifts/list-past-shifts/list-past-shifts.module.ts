import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPastShiftsPageRoutingModule } from './list-past-shifts-routing.module';

import { ListPastShiftsPage } from './list-past-shifts.page';
import {ComponentsModule} from "../../../../../shared/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListPastShiftsPageRoutingModule,
        ComponentsModule
    ],
  declarations: [ListPastShiftsPage]
})
export class ListPastShiftsPageModule {}
