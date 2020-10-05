import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ContactRoutingModule } from "./contact-routing.module";
import { ContactPage } from "./contact";
import { ComponentsModule } from "../../../../shared/components.module";
var ContactModule = /** @class */ (function () {
    function ContactModule() {
    }
    ContactModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                ContactRoutingModule,
                ComponentsModule
            ],
            declarations: [
                ContactPage
            ],
            bootstrap: [ContactPage]
        })
    ], ContactModule);
    return ContactModule;
}());
export { ContactModule };
//# sourceMappingURL=contact.module.js.map