import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {RegisterPage} from "./register";
import {RegisterPageRoutingModule} from "./register-routing.module";
import {ComponentsModule} from "../../shared/components.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RegisterPageRoutingModule,
        ComponentsModule,
        HttpClientModule,
        ReactiveFormsModule,
      FormsModule
    ],
  declarations: [
    RegisterPage

  ],
  bootstrap: [RegisterPage],
  providers: [
    AuthenticationService
  ]
})
export class RegisterModule { }

