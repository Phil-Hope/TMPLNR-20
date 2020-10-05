import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProfilePage } from "./profile";
var routes = [
    {
        path: '',
        component: ProfilePage
    }
];
var ProfilePageRoutingModule = /** @class */ (function () {
    function ProfilePageRoutingModule() {
    }
    ProfilePageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ProfilePageRoutingModule);
    return ProfilePageRoutingModule;
}());
export { ProfilePageRoutingModule };
//# sourceMappingURL=profile-routing.module.js.map