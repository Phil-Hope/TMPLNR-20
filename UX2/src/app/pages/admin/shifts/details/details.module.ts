import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {DetailsPageRoutingModule} from './details-routing.module';
import {DetailsPage} from './details.page';
import {ComponentsModule} from "../../../../shared/components.module";
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {UsersService} from "../../users/services/users.service";
import {CommentsService} from "../../../shifts/services/comments.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetailsPage],
  providers: [ShiftsService, UsersService, CommentsService]
})
export class DetailsPageModule {
}
