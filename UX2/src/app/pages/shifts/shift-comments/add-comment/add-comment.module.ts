import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddCommentPageRoutingModule } from './add-comment-routing.module';
import { AddCommentPage } from './add-comment.page';
import {ComponentsModule} from "../../../../shared/components.module";
import {ShiftsService} from "../../services/shifts.service";
import {UsersService} from "../../../admin/users/services/users.service";
import {CommentsService} from "../../services/comments.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCommentPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [AddCommentPage],
  providers: [ShiftsService, UsersService, CommentsService]
})
export class AddCommentPageModule {}
