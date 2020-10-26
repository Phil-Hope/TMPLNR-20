import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadSentPage } from './read-sent.page';

const routes: Routes = [
  {
    path: '',
    component: ReadSentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadSentPageRoutingModule {}
