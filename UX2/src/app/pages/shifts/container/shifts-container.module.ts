import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContainerPageRoutingModule } from './shifts-container-routing.module';

import { ContainerPage } from './shifts-container.page';
import {ComponentsModule} from "../../../shared/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContainerPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContainerPage]
})
export class ContainerPageModule {}
