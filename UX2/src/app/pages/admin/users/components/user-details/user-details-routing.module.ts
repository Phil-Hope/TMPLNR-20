import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UserDetailsPage} from "./user-details";

const routes: Routes = [
  {
    path: '',
    component: UserDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailsRoutingModule { }

