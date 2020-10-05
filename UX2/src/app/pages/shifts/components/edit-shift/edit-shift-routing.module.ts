import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EditShiftPage} from "./edit-shift";

const routes: Routes = [
  {
    path: '',
    component: EditShiftPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditShiftPageRoutingModule { }
