import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersShiftsPage} from "./users-shifts";

const routes: Routes = [
  {
    path: '',
    component: UsersShiftsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersShiftsRoutingModule { }
