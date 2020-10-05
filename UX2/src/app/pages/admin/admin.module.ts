import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { AdminPage } from "./admin";
import { AdminPageRoutingModule } from "./admin-routing.module";
import {ComponentsModule} from "../../shared/components.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AdminPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminPage],
  entryComponents: [AdminPage],
  bootstrap: [AdminPage]
})
export class AdminPageModule { }
