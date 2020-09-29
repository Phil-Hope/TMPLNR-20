import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';
import {UserService} from '../../services';
import {AlertService} from '../../services';
import {HttpResponse} from '@angular/common/http';

interface Login {
  location: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  pageTitle: 'Login';

  submitted = false;
  returnUrl: string;
  loginForm: FormGroup;
  loading = false;
  id: Login;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService
  ) { }

ngOnInit()
{
  this.loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
}

get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.userLogin(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
       data.headers.toString('location');
      },
        error => {
          this.loading = false;
        }
        );
  }

}
