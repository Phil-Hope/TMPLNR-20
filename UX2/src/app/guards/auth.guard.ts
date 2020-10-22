import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {AuthenticationService} from "../authentication/authentication.service";
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  token: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private storage: Storage
  ) {
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

  async canLoad(): Promise<boolean> {
    const value = await this.getUserLoggedIn();
    if (value) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
