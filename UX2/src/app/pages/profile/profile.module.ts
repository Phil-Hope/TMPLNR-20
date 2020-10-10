import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {ProfilePage} from "./profile";
import {HttpClientModule} from "@angular/common/http";
import {ProfilePageRoutingModule} from "./profile-routing.module";
import {ComponentsModule} from "../../shared/components.module";
import {AuthenticationService} from "../../services/authentication.service";

import {UsersService} from "../admin/users/services/users.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ProfilePageRoutingModule,
    ComponentsModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    ProfilePage
  ],
  bootstrap: [ProfilePage],
  providers: [
    AuthenticationService,
    UsersService,
  ]
})
export class ProfileModule { }
