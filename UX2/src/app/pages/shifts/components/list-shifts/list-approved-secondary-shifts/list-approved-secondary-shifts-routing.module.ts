import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListApprovedSecondaryShiftsPage } from './list-approved-secondary-shifts.page';

const routes: Routes = [
  {
    path: '',
    component: ListApprovedSecondaryShiftsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListApprovedSecondaryShiftsPageRoutingModule {}
