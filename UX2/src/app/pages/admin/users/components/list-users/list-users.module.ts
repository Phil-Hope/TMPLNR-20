import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { ListUsersRoutingModule } from "./list-users-routing.module";
import { ListUsersPage } from "./list-users";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ComponentsModule } from "../../../../../shared/components.module";
import {AuthenticationService} from "../../../../../services/authentication.service";
import {UsersService} from "../../services/users.service";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ListUsersRoutingModule,
        ComponentsModule,
        HttpClientModule,
        FormsModule
    ],
  declarations: [
    ListUsersPage
  ],
  providers: [
    AuthenticationService,
    UsersService,
  ]
})

export class ListUsersModule { }
