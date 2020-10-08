import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovedCalendarPage } from './approved-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovedCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovedCalendarPageRoutingModule {}
