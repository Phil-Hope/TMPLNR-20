import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListApprovedPrimaryShiftsPage } from './list-approved-primary-shifts.page';

const routes: Routes = [
  {
    path: '',
    component: ListApprovedPrimaryShiftsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListApprovedPrimaryShiftsPageRoutingModule {}
