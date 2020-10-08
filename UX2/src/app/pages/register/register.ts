import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {User} from '../../interfaces/user.interface';
import {HttpClient} from "@angular/common/http";
import {first, tap} from 'rxjs/operators';
import {AlertController} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";
import {UserTrackerError} from "../admin/users/services/user-errors.interface";
import {Router} from "@angular/router";

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
  user: User | UserTrackerError;
  date = new Date();

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public alert: AlertController,
    private authService: AuthenticationService,
    private router: Router,
  ) {
  }

  get f() {
    return this.form.controls;
  }

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
        roles: this.fb.array(['ROLE_USER', 'ROLE_ADMIN']),
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: this.MustMatch('password', 'confirmPassword')
      }
    );

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.dirty) {
        const f = {...this.user, ...this.form.value};
        this.loading = true;
        this.authService.register(f)
          .pipe(
            first(),
            tap(_ => this.router.navigateByUrl('/login'))
          ).subscribe(data => console.log('submitted form ' + JSON.stringify(data)));
      }
    }

  }
}

