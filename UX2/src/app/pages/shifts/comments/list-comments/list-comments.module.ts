import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCommentsPageRoutingModule } from './list-comments-routing.module';

import { ListCommentsPage } from './list-comments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCommentsPageRoutingModule
  ],
  declarations: [ListCommentsPage]
})
export class ListCommentsPageModule {}
