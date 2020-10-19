import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {SendPageRoutingModule} from './send-routing.module';
import {SendPage} from './send.page';
import {ComponentsModule} from "../../../shared/components.module";
import {UsersService} from "../../admin/users/services/users.service";
import {CommentsService} from "../../shifts/services/comments.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SendPage],
  providers: [UsersService, CommentsService]
})
export class SendPageModule {
}
