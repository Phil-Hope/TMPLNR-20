import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteCommentPage } from './delete-comment.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteCommentPageRoutingModule {}
