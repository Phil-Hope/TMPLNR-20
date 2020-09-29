import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  private currentUser;

  constructor(
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    if (this.currentUser) {
      return true;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).then(r => {});
    return false;
  }
}
