import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SwUpdate} from '@angular/service-worker';
import {Router} from '@angular/router';
import {MenuController, Platform, ToastController} from '@ionic/angular';
import {AuthenticationService} from "./authentication/authentication.service";
import {Storage} from "@ionic/storage";
import {User} from "./interfaces/user.interface";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  userIsAuthenticated: boolean;
  userIsAdmin: boolean;
  dark = false;
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
    this.isLoggedIn();
    this.isAdmin();
    this.authService.isAuthenticated.asObservable()
      .subscribe((data) => this.userIsAuthenticated = data);
    this.authService.isAdmin.asObservable()
      .subscribe((data) => this.userIsAdmin = data);
  }

  async getAuthStatus(): Promise<any> {
    try {
      const result = await this.storage.get('id');
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async isLoggedIn() {
    const value = await this.getAuthStatus();
    if (value) {
      this.userIsAuthenticated = true;
    } else {
      this.userIsAuthenticated = false;
    }
  }

  async getAdminStatus(): Promise<any> {
    try {
      const result = await this.storage.get('roles');
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async isAdmin() {
    const value = await this.getAdminStatus();
    if (value.length === 2) {
      this.userIsAdmin = true;
    } else {
      this.userIsAdmin = false;
    }
  }

  async ngOnInit() {

    this.authService.isAuthenticated.asObservable()
      .subscribe((data) => this.userIsAuthenticated = data);
    this.authService.isAdmin.asObservable()
      .subscribe((data) => this.userIsAdmin = data);

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
    this.userIsAdmin = false;
    this.userIsAuthenticated = false;
    await this.storage.clear().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

  openWelcome() {
    this.menu.enable(false);
    localStorage.set('ion_did_welcome', false);
    this.router.navigateByUrl('/welcome');
  }
}

