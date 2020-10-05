import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SwUpdate} from '@angular/service-worker';
import {Router} from '@angular/router';
import {MenuController, Platform, ToastController} from '@ionic/angular';
import {BehaviorSubject, Observable} from "rxjs";
import {AuthenticationService} from "./services/authentication.service";
import {filter, map, take} from "rxjs/operators";

const TOKEN_KEY = 'token';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  isAuthenticated: boolean;
  dark = false;
  id: Observable<any>;
  userData = BehaviorSubject;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private authService: AuthenticationService
  ) {
    this.initializeApp();
  }

  async OnInit() {
    this.swUpdate.available.subscribe(async res => {
      const
        toast = await this.toastCtrl.create({
          message: 'update available!',
          position: 'bottom',
          buttons: [
            {
              role: 'cancel',
              text: 'Reoload'
            }
          ]
        });
      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  updateLoggedInStatus(b: boolean): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
        return false;
        }
      })
    );
  }


  logout() {
    this.isAuthenticated = false;
    localStorage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userData = null;
    });
  }


  openWelcome() {
    this.menu.enable(false);
    localStorage.set('ion_did_welcome', false);
    this.router.navigateByUrl('/welcome');
  }
}
