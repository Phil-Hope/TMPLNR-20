import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../admin/users/services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../interfaces/user.interface";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  user: User;
  form: FormGroup;
  submitted = false;

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

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router)
  {
    this.form = this.fb.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    },
    {
      validator: this.MustMatch('password', 'confirm')
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.getUserById(id)
      .subscribe((data: User) => this.user = data);
  }

  get f() {
    return this.form.controls;
  }

  onResetPassword() {
    if (this.form.valid) {
      if (this.form.dirty) {
        this.submitted = true;
        this.usersService.resetPassword(this.form.value.id, this.form.value.password)
          .pipe(
            tap(_ => alert('Password Updated successfully!')),
            tap(_ => this.router.navigateByUrl('/users/profile'))
          )
          .subscribe((data) => console.log(JSON.stringify(data)));
      }
    }
  }

}
