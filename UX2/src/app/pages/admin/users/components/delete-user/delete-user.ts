import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../../../interfaces/user.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserTrackerError} from "../../services/user-errors.interface";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.html',
  styleUrls: ['./delete-user.scss'],
})
export class DeleteUserPage implements OnInit {

  form: FormGroup;
  user: User | UserTrackerError;
  isSubmitted = false;

  constructor(
      private usersService: UsersService,
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder,
      ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.getUserById(id).subscribe(data => this.user = data);

    this.form = this.fb.group({
      id: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  deleteUser() {
    this.isSubmitted = true;
    if (this.form.valid) {
      if (this.form.dirty) {

        const f = { ...this.user, ...this.form.value };

        this.usersService.deleteUser(f)
          .pipe(
            tap(_ => this.router.navigateByUrl('/users/list'))
          )
          .subscribe(data => console.log('deleted user ' + JSON.stringify(data)));
      }
    }

  }

}
