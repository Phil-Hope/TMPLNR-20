import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ContactRoutingModule } from "./contact-routing.module";
import { ContactPage } from "./contact";
import {ComponentsModule} from "../../../../shared/components.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ContactRoutingModule,
    ComponentsModule
  ],
  declarations: [
    ContactPage
  ],
  bootstrap: [ContactPage]
})
export class ContactModule { }
