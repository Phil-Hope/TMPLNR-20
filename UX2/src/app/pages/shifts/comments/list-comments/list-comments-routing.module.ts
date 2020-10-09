import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCommentsPage } from './list-comments.page';

const routes: Routes = [
  {
    path: '',
    component: ListCommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCommentsPageRoutingModule {}
