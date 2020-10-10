import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPendingPrimaryShiftsPage } from './list-pending-primary-shifts.page';

const routes: Routes = [
  {
    path: '',
    component: ListPendingPrimaryShiftsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPendingPrimaryShiftsPageRoutingModule {}
