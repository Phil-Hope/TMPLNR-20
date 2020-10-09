import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteCommentPageRoutingModule } from './delete-comment-routing.module';

import { DeleteCommentPage } from './delete-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteCommentPageRoutingModule
  ],
  declarations: [DeleteCommentPage]
})
export class DeleteCommentPageModule {}
