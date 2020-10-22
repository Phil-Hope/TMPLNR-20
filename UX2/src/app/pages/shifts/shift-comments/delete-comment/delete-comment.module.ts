import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteCommentPageRoutingModule } from './delete-comment-routing.module';

import { DeleteCommentPage } from './delete-comment.page';
import {ComponentsModule} from "../../../../shared/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DeleteCommentPageRoutingModule,
        ComponentsModule
    ],
  declarations: [DeleteCommentPage]
})
export class DeleteCommentPageModule {}
