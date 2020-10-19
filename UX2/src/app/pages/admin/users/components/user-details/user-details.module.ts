import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { UserDetailsPage } from "./user-details";
import { UserDetailsRoutingModule } from "./user-details-routing.module";
import {ComponentsModule} from "../../../../../shared/components.module";
import {AuthenticationService} from "../../../../../authentication/authentication.service";
import {UsersService} from "../../services/users.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpConfigInterceptor} from "../../../../../services/http.interceptor";

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
