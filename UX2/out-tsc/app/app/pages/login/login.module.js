import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from "./login";
import { LoginPageRoutingModule } from "./login-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ComponentsModule } from "../../shared/components.module";
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        NgModule({
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
            ]
        })
    ], LoginModule);
    return LoginModule;
}());
export { LoginModule };
//# sourceMappingURL=login.module.js.map