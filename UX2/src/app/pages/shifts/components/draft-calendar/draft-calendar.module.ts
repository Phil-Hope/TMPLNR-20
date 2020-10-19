import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {CalendarPage} from "./draft-calendar";
import {FormsModule} from "@angular/forms";
import {CalendarPageRoutingModule} from "./draft-calendar-routing.module";
import {ComponentsModule} from "../../../../shared/components.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {CalendarToolbarComponent} from "./calendar-toolbar/calendar-toolbar";
import {DragAndDropModule} from "angular-draggable-droppable";
import {ShiftsService} from "../../services/shifts.service";
import {AuthenticationService} from "../../../../authentication/authentication.service";
import {HttpConfigInterceptor} from "../../../../services/http.interceptor";

@NgModule({
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
    CalendarPage, CalendarToolbarComponent
  ],
  providers: [
    ShiftsService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class CalendarPageModule {
}
