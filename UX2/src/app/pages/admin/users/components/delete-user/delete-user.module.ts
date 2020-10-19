import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {DeleteUserPage} from "./delete-user";
import {DeleteUserPageRoutingModule} from "./delete-user-routing.module";
import {ComponentsModule} from "../../../../../shared/components.module";
import {AuthenticationService} from "../../../../../authentication/authentication.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {UsersService} from "../../services/users.service";
import {HttpConfigInterceptor} from "../../../../../services/http.interceptor";


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DeleteUserPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [
    DeleteUserPage
  ],
  providers: [
    AuthenticationService,
    UsersService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true}
  ]
})
export class DeleteUserPageModule {
}
