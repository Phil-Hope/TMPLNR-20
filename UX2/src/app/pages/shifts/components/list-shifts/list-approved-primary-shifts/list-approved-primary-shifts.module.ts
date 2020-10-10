import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ComponentsModule} from "../../../../../shared/components.module";
import {ListApprovedPrimaryShiftsPageRoutingModule} from './list-approved-primary-shifts-routing.module';
import {ListApprovedPrimaryShiftsPage} from './list-approved-primary-shifts.page';
import {ShiftsService} from "../../../services/shifts.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ListApprovedPrimaryShiftsPageRoutingModule
  ],
  declarations: [ListApprovedPrimaryShiftsPage],
  providers: [ShiftsService]
})
export class ListApprovedPrimaryShiftsPageModule {
}
