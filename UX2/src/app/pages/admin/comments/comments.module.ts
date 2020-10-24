import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CommentsPageRoutingModule} from './comments-routing.module';
import {CommentsPage} from './comments.page';
import {ComponentsModule} from "../../../shared/components.module";
import {CommentsService} from "../../shifts/services/comments.service";
import {UsersService} from "../users/services/users.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CommentsPage],
  providers: [CommentsService, UsersService]
})
export class CommentsPageModule {
}
