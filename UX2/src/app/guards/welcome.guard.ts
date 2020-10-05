import {Injectable} from '@angular/core';
import {
  CanLoad,
  Router
} from '@angular/router';
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

export const WELCOME_KEY = 'welcome_seen';

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanLoad {

  constructor(private router: Router) {
  }

  async canLoad(): Promise<boolean> {
    const hasSeenWelcome = await Storage.get({key: WELCOME_KEY});
    if (hasSeenWelcome && (hasSeenWelcome.value === 'true')) {
      return true;
    } else {
      this.router.navigateByUrl('./welcome', {replaceUrl: true});
      return false;
    }
  }
}
