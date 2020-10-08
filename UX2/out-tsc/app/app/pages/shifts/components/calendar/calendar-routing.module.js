import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CalendarPage } from "./calendar";
var routes = [
    {
        path: '',
        component: CalendarPage
    }
];
var CalendarPageRoutingModule = /** @class */ (function () {
    function CalendarPageRoutingModule() {
    }
    CalendarPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], CalendarPageRoutingModule);
    return CalendarPageRoutingModule;
}());
export { CalendarPageRoutingModule };
//# sourceMappingURL=draft-calendar-routing.module.js.map
