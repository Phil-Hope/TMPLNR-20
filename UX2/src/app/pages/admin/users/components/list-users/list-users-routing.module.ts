import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ListUsersPage } from "./list-users";

const routes: Routes = [
  {
    path: '',
    component: ListUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ListUsersRoutingModule { }
