import {Component, OnInit} from '@angular/core';
import {User} from '../../../../interfaces/user.interface';
import {Observable} from 'rxjs';
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfilePage implements OnInit {

  user$: User;
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
   const id = this.route.snapshot.paramMap.get('id');
   this.getUser(id);
  }

  getUser(id: string) {
    this.userService.getUserById(id).subscribe(data => this.user$ = data);
  }

  viewShiftDetails(): void {
    this.router.navigateByUrl('/users/:id/shifts');
  }
}
