import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ScheduledShift} from '../../../../interfaces/shifts.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../../../../interfaces/user.interface";
import {UsersService} from "../../../admin/users/services/users.service";
import {ShiftsService} from "../../services/shifts.service";
import {map, tap} from "rxjs/operators";
import {ShiftTrackerError} from "../../services/shifts-errors.provider";
import {UserTrackerError} from "../../../admin/users/services/user-errors.interface";

@Component({
  selector: 'app-edit-shift',
  templateUrl: './edit-shift.html',
  styleUrls: ['./edit-shift.scss'],
})
export class EditShiftPage implements OnInit {

  users: User[] | UserTrackerError;
  shifts: ScheduledShift[];
  shift: ScheduledShift | ShiftTrackerError;

  form: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService,
    private shiftsService: ShiftsService
  ) {
  }

  ngOnInit() {
    this.usersService.loadAllUsers().subscribe(data => this.users = data);

    const id = this.route.snapshot.paramMap.get('id');
    this.shiftsService.getShiftById(id).subscribe(data => this.shift = data);

    this.form = this.fb.group({
      start: [''],
      end: [''],
      onDuty: [''],
      ShiftStatus: [''],
      isApproved: [false]
    });
  }

  get f() { return this.form.controls; }

  editShift() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.dirty) {
        const f = { ...this.shift, ...this.form.value };
        this.loading = true;
        this.shiftsService.editShift(f)
          .pipe(
          map((res: ScheduledShift) => { this.router.navigateByUrl(`shifts/${res.id}/details`); }),
          tap(_ => console.log('Shift edited successfully!'))
        )
          .subscribe(data => data);
      }
    }
  }
}
