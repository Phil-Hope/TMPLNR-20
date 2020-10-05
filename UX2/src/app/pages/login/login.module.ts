import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { LoginPage } from "./login";
import { LoginPageRoutingModule } from "./login-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {ComponentsModule} from "../../shared/components.module";
import {RouteReuseStrategy} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    LoginPage
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [LoginPage]
})
export class LoginModule { }
