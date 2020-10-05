import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { UserDetailsPage } from "./user-details";
import { UserDetailsRoutingModule } from "./user-details-routing.module";
import {ComponentsModule} from "../../../../shared/components.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpConfigInterceptor} from "../../../../services/http.interceptor";
import {AuthenticationService} from "../../../../services/authentication.service";
import {UsersService} from "../../services/users.service";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    UserDetailsRoutingModule,
    ComponentsModule
  ],
  declarations: [
    UserDetailsPage
  ],
  providers: [
    AuthenticationService,
    UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class UserDetailsModule { }
