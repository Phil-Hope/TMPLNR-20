import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import {HttpClient} from "@angular/common/http";
import {first, map, tap} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {AlertController} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;

  pageTitle = 'Register';
  loading = false;
  submitted = false;
  user: User;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public alert: AlertController,
    private authService: AuthenticationService
  ) { }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      profilePicture: [''],
      wagePerHour: ['0.00'],
      roles: this.fb.array(['ROLE_USER', 'ROLE_ADMIN'] ),
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: this.MustMatch('password', 'confirmPassword')
      }
      );
    }

    get f() { return this.form.controls; }


    onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authService.register(
    this.f.firstName.value,
    this.f.lastName.value,
    this.f.email.value,
    this.f.contactNumber.value,
    this.f.profilePicture.value,
    this.f.wagePerHour.value,
    this.f.roles.value,
    this.f.password.value
   ).pipe(
     first()).subscribe();
    }
}

