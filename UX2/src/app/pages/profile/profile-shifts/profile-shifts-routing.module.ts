import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileShiftsPage } from './profile-shifts.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileShiftsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileShiftsPageRoutingModule {}
