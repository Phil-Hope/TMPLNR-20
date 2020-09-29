import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

  pageTitle = 'Add Employee';
  submitted = false;
  loading = false;
  user: User;
  form: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) { }

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

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.userService
      .addUser(
        this.f.firstName.value,
        this.f.lastName.value,
        this.f.constactNumber.value,
        this.f.wagePerHour.value,
        this.f.profilePicture.value,
        this.f.roles.value,
        this.f.email.value,
        this.f.password.value
      ).pipe(first()).subscribe((res) => { });
  }

}
