import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { ListUsersRoutingModule } from "./list-users-routing.module";
import { ListUsersPage } from "./list-users";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ComponentsModule } from "../../../../shared/components.module";
import {AuthenticationService} from "../../../../services/authentication.service";
import {HttpConfigInterceptor} from "../../../../services/http.interceptor";
import {UsersService} from "../../services/users.service";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ListUsersRoutingModule,
    ComponentsModule,
    HttpClientModule
  ],
  declarations: [
    ListUsersPage
  ],
  providers: [
    AuthenticationService,
    UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})

export class ListUsersModule { }
