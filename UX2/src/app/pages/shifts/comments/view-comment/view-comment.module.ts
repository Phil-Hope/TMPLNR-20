import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCommentPageRoutingModule } from './view-comment-routing.module';

import { ViewCommentPage } from './view-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCommentPageRoutingModule
  ],
  declarations: [ViewCommentPage]
})
export class ViewCommentPageModule {}
