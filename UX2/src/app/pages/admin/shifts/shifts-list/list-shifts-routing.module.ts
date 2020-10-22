import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminListShiftsPage} from "./list-shifts";

const routes: Routes = [
  {
    path: '',
    component: AdminListShiftsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListShiftsRoutingModule { }
