import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../../../interfaces/user.interface";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.html',
  styleUrls: ['./delete-user.scss'],
})
export class DeleteUserPage implements OnInit {

  user: User;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.getUserById(id).subscribe(data => this.user = data);
  }

  deleteUser(id: string) {
    this.usersService.deleteUser(id)
      .pipe(
        tap(_ => this.router.navigateByUrl('/users'))
      )
      .subscribe(data => console.log('deleted user ' + JSON.stringify(data)));
  }

}
