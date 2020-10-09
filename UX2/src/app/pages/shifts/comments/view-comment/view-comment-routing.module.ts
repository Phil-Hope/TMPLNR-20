import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCommentPage } from './view-comment.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCommentPageRoutingModule {}
