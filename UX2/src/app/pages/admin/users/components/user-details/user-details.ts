import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {User} from "../../../../../interfaces/user.interface";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.html',
  styleUrls: ['./user-details.scss'],
})
export class UserDetailsPage implements OnInit, OnChanges {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadUser(id);
  }

  loadUser(id: string) {
    return this.usersService.getUserById(id)
      .pipe(
        tap(_ => console.log(`loaded ${_.firstName} ${_.lastName}`))
      ).subscribe((data: User) => this.user = data);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadUser(this.user.id);
  }
}
