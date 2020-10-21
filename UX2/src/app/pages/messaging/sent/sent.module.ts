import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {SentPageRoutingModule} from './sent-routing.module';
import {SentPage} from './sent.page';
import {UsersService} from "../../admin/users/services/users.service";
import {CommentsService} from "../../shifts/services/comments.service";
import {ComponentsModule} from "../../../shared/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SentPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SentPage],
  providers: [UsersService, CommentsService]
})
export class SentPageModule {
}
