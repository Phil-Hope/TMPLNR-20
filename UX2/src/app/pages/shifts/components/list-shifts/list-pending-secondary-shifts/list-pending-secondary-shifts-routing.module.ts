import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPendingSecondaryShiftsPage } from './list-pending-secondary-shifts.page';

const routes: Routes = [
  {
    path: '',
    component: ListPendingSecondaryShiftsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPendingSecondaryShiftsPageRoutingModule {}
