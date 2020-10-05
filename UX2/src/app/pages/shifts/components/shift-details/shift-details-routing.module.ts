import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShiftDetailsPage } from "./shift-details";

const routes: Routes = [
  {
    path: '',
    component: ShiftDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftDetailsRoutingModule { }
