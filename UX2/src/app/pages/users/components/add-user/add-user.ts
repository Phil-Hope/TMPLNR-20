import { Component, OnInit } from '@angular/core';
import {User} from '../../../../interfaces/user.interface';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";


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

  constructor(private http: HttpClient, private fb: FormBuilder) {
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
      this.http.post<User>(`${environment.apiUrl}/shifts`,
        {
          firstName: this.f.firstName.value,
          lastName: this.f.lastName.value,
          contactNumber: this.f.contactNumber.value,
          wagePerHour: this.f.wagePerHour.value,
          profilePicture: this.f.profilePicture.value,
          roles: this.f.roles.value,
          email: this.f.email.value,
          password: this.f.password.value
        }
      );
    }
  }
}
