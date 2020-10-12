import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {User} from "../../../../../interfaces/user.interface";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.html',
  styleUrls: ['./user-details.scss'],
})
export class UserDetailsPage implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.getUserById(id).subscribe((data: User) => this.user = data);
  }

}
