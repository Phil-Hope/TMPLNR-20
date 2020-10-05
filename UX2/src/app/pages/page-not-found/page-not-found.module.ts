import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { PageNotFoundPage } from "./page-not-found";
import { PageNotFoundRoutingModule } from "./page-not-found-routing.module";
import {RouterModule} from "@angular/router";
import {ComponentsModule} from "../../shared/components.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PageNotFoundRoutingModule,
    ComponentsModule,
    RouterModule
  ],
  declarations: [
    PageNotFoundPage

  ]
})
export class PageNotFoundModule { }
