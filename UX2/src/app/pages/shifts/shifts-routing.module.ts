import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ListShiftsPage} from "./components/list-shifts/list-shifts/list-shifts";


const routes: Routes = [
  {
    path: '',
    component: ListShiftsPage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftsRoutingModule { }
