import {Component, OnInit} from '@angular/core';
import {User} from '../../../../../interfaces/user.interface';
import {UsersService} from "../../services/users.service";
import {UserTrackerError} from "../../services/user-errors.interface";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.html',
  styleUrls: ['./list-users.scss'],
})
export class ListUsersPage implements OnInit {

  users: User[] | UserTrackerError;
  user: User;

  date = new Date();

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.loadAllUsers().subscribe(users => this.users = users);
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
}
