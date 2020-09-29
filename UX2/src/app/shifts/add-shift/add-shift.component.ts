import {Component, OnInit} from '@angular/core';
import {ShiftService} from '../../services';
import {ScheduledShift} from '../../models/scheduledshift.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss'],
})
export class AddShiftComponent implements OnInit {

  pageTitle: 'Add Shift';
  submitted = false;
  loading = false;
  shift: ScheduledShift;
  user: Observable<User>;
  users: Observable<User[]>;
  form: FormGroup;

  constructor(public shiftService: ShiftService, private userService: UserService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.users = this.userService.getAllUsers();

    this.form = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      onDuty: ['', Validators.required],
      ShiftStatus: ['', Validators.required],
    });

  }

  get f() { return this.form.controls; }

  addShift() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.shiftService
      .addShift(
        this.f.start.value,
        this.f.end.value,
        this.f.onDuty.value,
        this.f.ShiftStatus.value
        )
      .pipe(first())
      .subscribe((res) => { });
    }
  }
