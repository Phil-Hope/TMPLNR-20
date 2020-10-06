import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../../interfaces/user.interface";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.html',
  styleUrls: ['./delete-user.scss'],
})
export class DeleteUserPage implements OnInit {

  form: FormGroup;
  user: User;

  constructor(
      private usersService: UsersService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadUserToReview(id).subscribe(data => this.user = data);

    this.form = this.fb.group({
      id: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  deleteUser() {
    return  this.usersService.deleteUser(this.f.id.value).subscribe(data => data);
  }

  loadUserToReview(id: string): Observable<User> {
    return this.usersService.getUserById(id);
  }

}
