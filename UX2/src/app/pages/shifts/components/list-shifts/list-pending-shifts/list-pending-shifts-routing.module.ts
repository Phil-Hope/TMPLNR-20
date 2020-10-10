import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPendingShiftsPage } from './list-pending-shifts.page';

const routes: Routes = [
  {
    path: '',
    component: ListPendingShiftsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPendingShiftsPageRoutingModule {}
