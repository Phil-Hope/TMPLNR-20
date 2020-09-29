import {Component, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  currentUser: Observable<User>;
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(
    private router: Router) {
  }


}
