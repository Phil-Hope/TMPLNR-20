import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing.module";
import {RouteReuseStrategy} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";
import {IonicStorageModule, Storage} from "@ionic/storage";
import {JWT_OPTIONS, JwtModule} from "@auth0/angular-jwt";
import {ShiftsService} from "./pages/shifts/services/shifts.service";
import {HttpConfigInterceptor} from "./services/http.interceptor";

export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('token');
    }
  };
}

@NgModule({

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    }),
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    ShiftsService,
    AuthenticationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],

})
export class AppModule { }
