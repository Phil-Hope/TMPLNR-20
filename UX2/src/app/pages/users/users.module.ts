import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { UsersPage } from "./container/users";
import { UsersRoutingModule } from "./users-routing.module";
import { ComponentsModule } from "../../shared/components.module";
import {AuthenticationService} from "../../services/authentication.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpConfigInterceptor} from "../../services/http.interceptor";
import {UsersService} from "./services/users.service";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    UsersRoutingModule,
    ComponentsModule
  ],
  declarations: [
    UsersPage
  ],
  providers: [
    AuthenticationService,
    UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class UsersModule { }
