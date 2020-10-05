import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {ProfilePage} from "./profile";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProfilePageRoutingModule} from "./profile-routing.module";
import {ComponentsModule} from "../../../../shared/components.module";
import {AuthenticationService} from "../../../../services/authentication.service";
import {HttpConfigInterceptor} from "../../../../services/http.interceptor";
import {UsersService} from "../../services/users.service";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ProfilePageRoutingModule,
    ComponentsModule,
    HttpClientModule
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
