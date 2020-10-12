import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ShiftsRoutingModule } from "./shifts-routing.module";
import {ComponentsModule} from "../../shared/components.module";
import {ShiftsService} from "./services/shifts.service";
import {IonicStorageModule} from "@ionic/storage";
import {AuthenticationService} from "../../services/authentication.service";
import {UsersService} from "../admin/users/services/users.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpConfigInterceptor} from "../../services/http.interceptor";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ShiftsRoutingModule,
    ComponentsModule,
    IonicStorageModule
  ],
  providers: [ShiftsService, AuthenticationService, UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ],
})
export class ShiftsModule { }
