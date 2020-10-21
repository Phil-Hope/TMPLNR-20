import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {AuthenticationService} from "../authentication/authentication.service";
import {filter, map, take} from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AutoLoginGuard implements CanLoad {

  token: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router
) {
  }

   canLoad(): Observable<boolean> {
      return this.authService.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        console.log('previous token found');
        if (isAuthenticated) {
          this.router.navigateByUrl('/users/profile', {replaceUrl: true});
        } else {
          return true;
        }
      })
    );
  }
}
