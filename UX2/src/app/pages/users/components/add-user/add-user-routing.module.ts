import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AddUserPage} from "./add-user";

const routes: Routes = [
  {
    path: '',
    component: AddUserPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AddUserPageRoutingModule { }
