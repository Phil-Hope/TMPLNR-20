import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../authentication/authentication.service";
import {map, take} from "rxjs/operators";
import {AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  token: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {
  }

  async getStorage(): Promise<any> {
    try {
      this.token = await this.storage.get('roles');
      console.log(this.token);
      return this.token;
    }
    catch (e) { console.log(e); }
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.user.pipe(
      take(1),
       map(() => {
        if (this.token.length === 0) {
          this.alertCtrl.create({
            header: 'Unauthorized',
            message: 'Not authorized to view this page!',
            buttons: ['OK']
          }).then(alert => alert.present());
          this.router.navigateByUrl('/login');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
