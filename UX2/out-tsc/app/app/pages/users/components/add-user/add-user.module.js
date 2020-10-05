import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { AddUserPage } from "./add-user";
import { HttpClientModule } from "@angular/common/http";
import { AddUserPageRoutingModule } from "./add-user-routing.module";
import { ComponentsModule } from "../../../../shared/components.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
var AddUserModule = /** @class */ (function () {
    function AddUserModule() {
    }
    AddUserModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                AddUserPageRoutingModule,
                ComponentsModule,
                HttpClientModule,
                ReactiveFormsModule,
                FormsModule
            ],
            declarations: [AddUserPage]
        })
    ], AddUserModule);
    return AddUserModule;
}());
export { AddUserModule };
//# sourceMappingURL=add-user.module.js.map