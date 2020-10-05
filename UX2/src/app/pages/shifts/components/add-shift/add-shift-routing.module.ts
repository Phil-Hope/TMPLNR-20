import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AddShiftPage } from "./add-shift";

const routes: Routes = [
  {
    path: '',
    component: AddShiftPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddShiftRoutingModule { }
