import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ReplyPageRoutingModule} from './reply-routing.module';
import {ReplyPage} from './reply.page';
import {ComponentsModule} from "../../../shared/components.module";
import {UsersService} from "../../admin/users/services/users.service";
import {CommentsService} from "../../shifts/services/comments.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReplyPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [ReplyPage],
  providers: [UsersService, CommentsService]
})
export class ReplyPageModule {
}
