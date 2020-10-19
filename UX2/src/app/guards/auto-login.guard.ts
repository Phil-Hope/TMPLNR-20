import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {AuthenticationService} from "../authentication/authentication.service";
import {filter, map, take} from 'rxjs/operators';
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})

export class AutoLoginGuard implements CanLoad {

  token: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private storage: Storage) {
  }

  async getStorage(): Promise<any> {
    try {
      const result = await this.storage.get('id');
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
    this.token = await this.getStorage();
  }

   canLoad() {
      return this.authService.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(() => {
        console.log('Found previous token, automatic login');
        if (this.token.length > 0) {
           this.router.navigateByUrl('/users/profile', {replaceUrl: true});
        } else {
          return true;
        }
      })
    );
  }
}
