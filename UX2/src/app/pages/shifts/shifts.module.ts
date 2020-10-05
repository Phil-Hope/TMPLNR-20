import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ShiftsRoutingModule } from "./shifts-routing.module";
import {ComponentsModule} from "../../shared/components.module";
import {ShiftsService} from "./services/shifts.service";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ShiftsRoutingModule,
    ComponentsModule,
    IonicStorageModule
  ],
  providers: [ShiftsService],
})
export class ShiftsModule { }
