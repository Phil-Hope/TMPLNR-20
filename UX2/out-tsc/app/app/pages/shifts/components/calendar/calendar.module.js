import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { CalendarPage } from "./calendar";
import { FormsModule } from "@angular/forms";
import { CalendarPageRoutingModule } from "./calendar-routing.module";
import { ComponentsModule } from "../../../../shared/components.module";
import { HttpClientModule } from "@angular/common/http";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarHeaderComponent } from "./calendar-header/calendar-header";
import { DragAndDropModule } from "angular-draggable-droppable";
var CalendarPageModule = /** @class */ (function () {
    function CalendarPageModule() {
    }
    CalendarPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule,
                CalendarPageRoutingModule,
                ComponentsModule,
                FormsModule,
                DragAndDropModule,
                HttpClientModule,
                CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
            ],
            declarations: [
                CalendarPage, CalendarHeaderComponent
            ]
        })
    ], CalendarPageModule);
    return CalendarPageModule;
}());
export { CalendarPageModule };
//# sourceMappingURL=draft-calendar.module.js.map
