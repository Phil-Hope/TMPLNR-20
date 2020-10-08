import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PendingApprovalShiftsPage} from "./pending-approval-shifts";

const routes: Routes = [
  {
    path: '',
    component: PendingApprovalShiftsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingApprovalShiftsRoutingModule { }
