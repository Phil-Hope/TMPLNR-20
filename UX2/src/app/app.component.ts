import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SwUpdate} from '@angular/service-worker';
import {Router} from '@angular/router';
import {MenuController, Platform, ToastController} from '@ionic/angular';
import {BehaviorSubject, Observable} from "rxjs";
import {AuthenticationService} from "./services/authentication.service";
import {filter, map, take} from "rxjs/operators";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {User} from "./interfaces/user.interface";

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
  userData = BehaviorSubject;
  user: User;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private authService: AuthenticationService,
    private storage: Storage,
    private http: HttpClient,
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

    const prefersColor = window.matchMedia('(prefers-color-scheme: dark)');
    this.dark = prefersColor.matches;
    this.updateDarkMode();

    prefersColor.addEventListener(
      'change',
      mediaQuery => {
        this.dark = mediaQuery.matches;
        this.updateDarkMode();
      }
    );
  }

  updateDarkMode() {
  document.body.classList.toggle('dark', this.dark);
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

 async logout() {
    this.isAuthenticated = false;
    await this.storage.clear().then(() => {
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
