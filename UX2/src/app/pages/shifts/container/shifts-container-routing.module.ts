import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerPage } from './shifts-container.page';

const routes: Routes = [
  {
    path: '',
    component: ContainerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContainerPageRoutingModule {}
