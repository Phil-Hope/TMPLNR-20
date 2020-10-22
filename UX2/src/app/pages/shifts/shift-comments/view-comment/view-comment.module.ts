import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ViewCommentPageRoutingModule} from './view-comment-routing.module';
import {ViewCommentPage} from './view-comment.page';
import {CommentsService} from "../../services/comments.service";
import {ComponentsModule} from "../../../../shared/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCommentPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ViewCommentPage],
  providers: [CommentsService]
})
export class ViewCommentPageModule {
}
