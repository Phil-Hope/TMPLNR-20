import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SwUpdate} from '@angular/service-worker';
import {Router} from '@angular/router';
import {MenuController, Platform, ToastController} from '@ionic/angular';
import {BehaviorSubject, Observable} from "rxjs";
import {AuthenticationService} from "./authentication/authentication.service";
import {Storage} from "@ionic/storage";
import {User} from "./interfaces/user.interface";
import {distinctUntilChanged} from "rxjs/operators";

export class LoggedIn {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean;
  isAdmin: boolean;
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
  ) {
    this.initializeApp();
    this.updateLoggedInStatus().catch(r => {this.isAuthenticated = true; });
    this.updateAdminStatus().catch(r => {this.isAuthenticated = true; });
  }

  async ngOnInit() {
    this.swUpdate.available.subscribe(async res => {
      const
        toast = await this.toastCtrl.create({
          message: 'update available!',
          position: 'bottom',
          buttons: [
            {
              role: 'cancel',
              text: 'Reload'
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

  async getUserLoggedIn(): Promise<any> {
    try {
      const result = await this.storage.get('id');
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async getIsAdmin(): Promise<any> {
    try {
      const result = await this.storage.get('roles');
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async updateAdminStatus(): Promise<boolean> {
    const value = await this.getIsAdmin();
    if (value.length === 2) {
      return this.isAuthenticated = true;
    }
  }

  async updateLoggedInStatus(): Promise<boolean> {
    const user = await this.getUserLoggedIn();
    if (user) {
      return this.isAdmin = true;
    }
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

  async logout() {
    this.isAuthenticated;
    this.isAdmin = false;
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
