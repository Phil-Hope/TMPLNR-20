import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShiftCommentsPage } from './shift-comments.page';

const routes: Routes = [
  {
    path: '',
    component: ShiftCommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShiftCommentsPageRoutingModule {}
