import {Component, OnInit} from '@angular/core';
import {ScheduledShift} from '../../../../interfaces/shifts.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../interfaces/user.interface';
import {Observable} from 'rxjs';
import {map, tap} from "rxjs/operators";
import {ShiftsService} from "../../services/shifts.service";
import {UsersService} from "../../../users/services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.html',
  styleUrls: ['./add-shift.scss'],
})
export class AddShiftPage implements OnInit {

  pageTitle: 'Add Shift';
  submitted = false;
  loading = false;
  shift: ScheduledShift;
  user: Observable<User>;
  users: User[];
  form: FormGroup;

  constructor(
      private fb: FormBuilder,
      private shiftsService: ShiftsService,
      private usersService: UsersService,
      private router: Router,
  ) {
  }

  ngOnInit() {
    this.usersService.loadAllUsers().subscribe(data => this.users = data);

    this.form = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      onDuty: ['', Validators.required],
      ShiftStatus: ['', Validators.required],
      isApproved: [false, Validators.required]
    });

  }

  get f() { return this.form.controls; }

  addShift() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.shiftsService.addShift(
        this.f.start.value,
        this.f.end.value,
        this.f.onDuty.value,
        this.f.ShiftStatus.value,
        this.f.isApproved.value,
    )
        .pipe(
      map((res: ScheduledShift) => { this.router.navigateByUrl(`/shifts/${res.id}/details`); })
        )
    .subscribe(data => console.log(data));
  }
}
