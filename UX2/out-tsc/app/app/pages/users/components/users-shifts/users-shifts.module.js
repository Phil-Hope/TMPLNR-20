import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { UsersShiftsRoutingModule } from "./users-shifts-routing.module";
import { UsersShiftsPage } from "./users-shifts";
var UsersShiftsModule = /** @class */ (function () {
    function UsersShiftsModule() {
    }
    UsersShiftsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                UsersShiftsRoutingModule,
            ],
            declarations: [UsersShiftsPage]
        })
    ], UsersShiftsModule);
    return UsersShiftsModule;
}());
export { UsersShiftsModule };
//# sourceMappingURL=users-shifts.module.js.map