import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {AddUserPage} from "./add-user";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AddUserPageRoutingModule} from "./add-user-routing.module";
import {ComponentsModule} from "../../../../shared/components.module";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../../../services/authentication.service";
import {HttpConfigInterceptor} from "../../../../services/http.interceptor";
import {UsersService} from "../../services/users.service";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        AddUserPageRoutingModule,
        ComponentsModule,
        HttpClientModule,
        ReactiveFormsModule,
      FormsModule
    ],
  declarations: [AddUserPage],
  providers: [
    AuthenticationService,
    UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class AddUserModule { }
