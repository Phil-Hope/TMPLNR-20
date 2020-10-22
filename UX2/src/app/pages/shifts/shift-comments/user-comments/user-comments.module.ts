import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {UserCommentsPageRoutingModule} from './user-comments-routing.module';
import {UserCommentsPage} from './user-comments.page';
import {UsersService} from "../../../admin/users/services/users.service";
import {CommentsService} from "../../services/comments.service";
import {ShiftsService} from "../../services/shifts.service";
import {ComponentsModule} from "../../../../shared/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserCommentsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UserCommentsPage],
  providers: [UsersService, CommentsService, ShiftsService]
})
export class UserCommentsPageModule {
}
