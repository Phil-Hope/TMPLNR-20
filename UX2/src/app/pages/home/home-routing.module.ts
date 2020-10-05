import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePage } from "./container/home";

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'contact',
        loadChildren: () => import('./components/contact/contact.module')
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
