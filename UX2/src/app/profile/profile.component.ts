import {Component, OnInit} from '@angular/core';
import {UserService} from '../services';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  users: User[];
  user$: Observable<User>;

  constructor(private userService: UserService, private localStorage: LocalStorage) {
  }

  ngOnInit() {
    this.localStorage.getItem('uri');
  }
}
