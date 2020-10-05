import {Component, OnInit} from '@angular/core';
import {User} from '../../../../interfaces/user.interface';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.html',
  styleUrls: ['./list-users.scss'],
})
export class ListUsersPage implements OnInit {

  user: Observable<User>;
  users: Observable<User[]>;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.users = this.http.get<User[]>(`${environment.apiUrl}/users.json`);

    this.users.subscribe(data => console.log(data));
  }
}
