import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadSentPageRoutingModule } from './read-sent-routing.module';

import { ReadSentPage } from './read-sent.page';
import {ComponentsModule} from "../../../shared/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReadSentPageRoutingModule,
        ComponentsModule
    ],
  declarations: [ReadSentPage]
})
export class ReadSentPageModule {}
