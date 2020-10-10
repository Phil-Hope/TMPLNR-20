import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShiftCommentsPageRoutingModule } from './shift-comments-routing.module';

import { ShiftCommentsPage } from './shift-comments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShiftCommentsPageRoutingModule
  ],
  declarations: [ShiftCommentsPage]
})
export class ShiftCommentsPageModule {}
