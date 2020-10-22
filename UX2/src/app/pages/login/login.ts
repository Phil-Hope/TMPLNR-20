import {AuthenticationService} from '../../authentication/authentication.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {tap} from "rxjs/operators";

export interface Token {
  token: string;
  data: {
    id: string;
    roles: [];
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;
  pageTitle: 'Login';
  id = '';
  isLoggedIn = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
  ) {
  }

  ngOnInit() {

    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

   login(){
    if (this.credentials.valid){
      if (this.credentials.dirty) {
        return this.authService.login(this.email.value, this.password.value)
          .pipe(
            tap(_ => console.log('Logged In Successfully!'))
          ).subscribe(data => data);
      }
    }
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

}
