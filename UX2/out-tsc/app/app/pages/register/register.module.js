import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RegisterPage } from "./register";
import { RegisterPageRoutingModule } from "./register-routing.module";
import { ComponentsModule } from "../../shared/components.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
var RegisterModule = /** @class */ (function () {
    function RegisterModule() {
    }
    RegisterModule = __decorate([
        NgModule({
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
            bootstrap: [RegisterPage]
        })
    ], RegisterModule);
    return RegisterModule;
}());
export { RegisterModule };
//# sourceMappingURL=register.module.js.map