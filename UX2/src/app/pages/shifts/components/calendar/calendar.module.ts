import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ComponentsModule} from "../../../../shared/components.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {IonicModule} from '@ionic/angular';
import {DragAndDropModule} from "angular-draggable-droppable";
import {ShiftsService} from "../../services/shifts.service";
import {AuthenticationService} from "../../../../authentication/authentication.service";
import {ApprovedCalendarPageRoutingModule} from './calendar-routing.module';
import {CalendarToolbarApprovedComponent} from "./calendar-toolbar/calendar-toolbar";
import {CalendarPage} from './calendar.page';
import {HttpConfigInterceptor} from "../../../../services/http.interceptor";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    HttpClientModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    DragAndDropModule,
    ApprovedCalendarPageRoutingModule
  ],
  declarations: [
    CalendarPage,
    CalendarToolbarApprovedComponent
  ],
  providers: [
    ShiftsService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class ApprovedCalendarPageModule {
}
