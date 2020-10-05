import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {IonicStorageModule} from "@ionic/storage";

import {WelcomePage} from "./welcome";
import { WelcomeRoutingModule } from "./welcome-routing.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    WelcomeRoutingModule,
    IonicStorageModule
  ],
  declarations: [WelcomePage],
  entryComponents: [WelcomePage],
})
export class WelcomeModule { }
