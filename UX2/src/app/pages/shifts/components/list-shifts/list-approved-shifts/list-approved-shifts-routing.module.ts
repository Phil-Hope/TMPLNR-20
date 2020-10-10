import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListApprovedShiftsPage } from './list-approved-shifts.page';

const routes: Routes = [
  {
    path: '',
    component: ListApprovedShiftsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListApprovedShiftsPageRoutingModule {}
