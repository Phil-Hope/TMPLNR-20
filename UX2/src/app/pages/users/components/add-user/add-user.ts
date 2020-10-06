import { Component, OnInit } from '@angular/core';
import {User} from '../../../../interfaces/user.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import {UsersService} from "../../services/users.service";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.html',
  styleUrls: ['./add-user.scss'],
})
export class AddUserPage implements OnInit {

  pageTitle = 'Add Employee';
  submitted = false;
  loading = false;
  user: User;
  form: FormGroup;

  constructor(private userService: UsersService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      wagePerHour: ['', Validators.required],
      profilePicture: [''],
      roles: this.fb.array([]),
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(
  ): Observable<User> {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    } else {
      this.userService.addUser(
          this.f.firstName.value,
          this.f.lastName.value,
          this.f.contactNumber.value,
          this.f.wagePerHour.value,
          this.f.profilePicture.value,
          this.f.roles.value,
          this.f.email.value,
          this.f.password.value
      ).pipe(
          tap(_ => console.log('New User Added!')),
      ).subscribe(data => this.user = data);
    }
  }
}
