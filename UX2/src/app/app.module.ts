import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {IonicModule} from '@ionic/angular';
import {IonicStorageModule} from '@ionic/storage';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {ShiftsResolver} from './services/shifts.resolver';


import {AlertService, CommentService, ShiftService, UserService} from './services';
import {ContactComponent, FooterComponent, HeaderComponent, HomeComponent, PageNotFoundComponent} from './core';

import {LoginComponent, RegisterComponent} from './authentication';

import {
  AddShiftComponent,
  DeleteShiftComponent,
  EditShiftComponent,
  ListShiftsComponent,
  MyCalendarComponent,
  ShiftDetailsComponent,
} from './shifts';

import {
  AddUserComponent,
  AdminComponent,
  DashboardComponent,
  DeleteUserComponent,
  EditUserComponent,
  UserDetailsComponent,
  UsersComponent
} from './admin';

import {ProfileComponent} from './profile';
import {Observable} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    AddShiftComponent,
    MyCalendarComponent,
    ShiftDetailsComponent,
    ListShiftsComponent,
    EditShiftComponent,
    DeleteShiftComponent,
    DashboardComponent,
    UsersComponent,
    AddUserComponent,
    UserDetailsComponent,
    EditUserComponent,
    DeleteUserComponent,
    ProfileComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MatNativeDateModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'shifts', component: ListShiftsComponent},
      {path: 'shifts/add', component: AddShiftComponent},
      {path: 'shifts/calendar', component: MyCalendarComponent},
      {path: 'shifts/details/:id', component: ShiftDetailsComponent},
      {path: 'shifts/edit/:id', component: EditShiftComponent},
      {path: 'shifts/delete/:id', component: DeleteShiftComponent},
      {path: 'admin', component: DashboardComponent},
      {path: 'admin/users', component: UsersComponent},
      {path: 'admin/users/add', component: AddUserComponent},
      {path: 'admin/users/details/:id', component: UserDetailsComponent},
      {path: 'admin/users/edit/:id', component: EditUserComponent},
      {path: 'admin/users/delete/:id', component: DeleteUserComponent},
      {path: 'api/users/:id', component: ProfileComponent},
      {path: '**', component: PageNotFoundComponent}
    ]),
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  bootstrap: [AppComponent],
  providers: [InAppBrowser,
    StatusBar,
    SplashScreen,
    ShiftService,
    UserService,
    CommentService,
    AlertService,
    ShiftsResolver
  ],

})
export class AppModule {
  pageTitle: Observable<string>;
}
