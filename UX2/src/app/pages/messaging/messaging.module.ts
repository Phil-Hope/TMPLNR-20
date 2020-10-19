import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {MessagingPageRoutingModule} from './messaging-routing.module';
import {MessagingPage} from './messaging.page';
import {ComponentsModule} from "../../shared/components.module";
import {CommentsService} from "../shifts/services/comments.service";
import {UsersService} from "../admin/users/services/users.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagingPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MessagingPage],
  providers: [CommentsService, UsersService]
})
export class MessagingPageModule {
}
