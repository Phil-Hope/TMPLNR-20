import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../../admin/users/services/users.service";
import {User} from "../../../../interfaces/user.interface";

@Component({
  selector: 'app-on-duty',
  templateUrl: './on-duty.page.html',
  styleUrls: ['./on-duty.page.scss'],
})
export class OnDutyPage implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadUser(id);
  }

  loadUser(id: string) {
    this.userService.getUserById(id)
      .subscribe((data) => this.user = data);
  }

}
