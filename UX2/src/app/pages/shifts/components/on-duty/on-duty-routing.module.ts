import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnDutyPage } from './on-duty.page';

const routes: Routes = [
  {
    path: '',
    component: OnDutyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnDutyPageRoutingModule {}
