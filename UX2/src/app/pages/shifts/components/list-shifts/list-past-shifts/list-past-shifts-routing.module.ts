import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPastShiftsPage } from './list-past-shifts.page';

const routes: Routes = [
  {
    path: '',
    component: ListPastShiftsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPastShiftsPageRoutingModule {}
