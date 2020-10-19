import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {ProfilePage} from "./profile";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProfilePageRoutingModule} from "./profile-routing.module";
import {ComponentsModule} from "../../shared/components.module";
import {AuthenticationService} from "../../authentication/authentication.service";

import {UsersService} from "../admin/users/services/users.service";
import {FormsModule} from "@angular/forms";
import {HttpConfigInterceptor} from "../../services/http.interceptor";

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
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class ProfileModule { }
