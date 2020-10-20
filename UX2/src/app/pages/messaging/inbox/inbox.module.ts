import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {InboxPageRoutingModule} from './inbox-routing.module';
import {InboxPage} from './inbox.page';
import {ComponentsModule} from "../../../shared/components.module";
import {UsersService} from "../../admin/users/services/users.service";
import {CommentsService} from "../../shifts/services/comments.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InboxPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InboxPage],
  providers: [UsersService, CommentsService]
})
export class InboxPageModule {
}
