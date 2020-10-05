import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomePage } from "./container/home";
var routes = [
    {
        path: '',
        component: HomePage,
        children: [
            {
                path: 'contact',
                loadChildren: function () { return import('./components/contact/contact.module'); }
            }
        ]
    }
];
var HomePageRoutingModule = /** @class */ (function () {
    function HomePageRoutingModule() {
    }
    HomePageRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forChild(routes)
            ],
            exports: [RouterModule]
        })
    ], HomePageRoutingModule);
    return HomePageRoutingModule;
}());
export { HomePageRoutingModule };
//# sourceMappingURL=home-routing.module.js.map