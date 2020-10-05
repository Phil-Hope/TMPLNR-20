import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersPage} from "./container/users";

const routes: Routes = [
  {
    path: '',
    component: UsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
