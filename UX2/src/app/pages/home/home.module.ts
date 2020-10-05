import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { HomePage } from "./container/home";
import { HomePageRoutingModule } from "./home-routing.module";
import {ComponentsModule} from "../../shared/components.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    HomePage
  ],
  bootstrap: [HomePage]
})
export class HomePageModule { }
