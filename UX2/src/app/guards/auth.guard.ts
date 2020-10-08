import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {map, take} from "rxjs/operators";
import {AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {
  }

  async getStorage(): Promise<any> {
    try {
      const result = await this.storage.get('roles');
      console.log(result);
      return result;
    }
    catch (e) { console.log(e); }
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          this.alertCtrl.create({
            header: 'Unauthorized',
            message: 'Not authorized to view this page!',
            buttons: ['OK']
          }).then(alert => alert.present());
          this.router.navigateByUrl('/home');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
