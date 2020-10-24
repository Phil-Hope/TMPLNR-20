import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SendToPageRoutingModule } from './send-to-routing.module';
import { SendToPage } from './send-to.page';
import {ComponentsModule} from "../../../shared/components.module";
import {UsersService} from "../../admin/users/services/users.service";
import {CommentsService} from "../../shifts/services/comments.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendToPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SendToPage],
  providers: [UsersService, CommentsService]
})
export class SendToPageModule {}
