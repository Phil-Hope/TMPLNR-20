import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {ShiftCommentsPage} from "./shift-comments";

const routes: Routes = [
  {
    path: '',
    component: ShiftCommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftCommentsRoutingModule { }
