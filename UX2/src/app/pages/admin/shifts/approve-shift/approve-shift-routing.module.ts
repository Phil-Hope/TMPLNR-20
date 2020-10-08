import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ApproveShiftPage} from "./approve-shift";

const routes: Routes = [
  {
    path: '',
    component: ApproveShiftPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveShiftRoutingModule { }
