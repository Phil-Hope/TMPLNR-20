import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {

  user: User;
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers()
      .subscribe((response) =>
      {
        this.users = response;
      }
    );
  }
}
