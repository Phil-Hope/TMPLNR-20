import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "../../../../../interfaces/user.interface";
import {UsersService} from "../../services/users.service";
import {UserTrackerError} from "../../services/user-errors.interface";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.html',
  styleUrls: ['./edit-user.scss'],
})
export class EditUserPage implements OnInit {

  user: User | UserTrackerError;
  form: FormGroup;
  submitted = false;
  id: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {
    this.form = this.fb.group({
        id: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        contactNumber: ['', Validators.required],
        roles: [['ROLE_USER', 'ROLE_ADMIN'], Validators.required],
        profilePicture: ['', Validators.required],
        wagePerHour: ['', Validators.required],
      }
    );
  }

  ngOnInit() {
    this.getUser().subscribe(data => this.user = data);
  }

  getUser(): Observable<any> {
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id');
      });
    return this.userService.getUserById(this.id);
  }


  editUser() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.dirty) {
        const f = {...this.user, ...this.form.value};
        this.userService.editUser(f)
          .subscribe(data => console.log('user edit: ' + JSON.stringify(data)));
      }
    } else {
      return;
    }
  }

}
