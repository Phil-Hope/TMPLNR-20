import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScheduledShift} from '../../../../interfaces/shifts.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../../../../interfaces/user.interface";
import {UsersService} from "../../../admin/users/services/users.service";
import {ShiftsService} from "../../services/shifts.service";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-edit-shift',
  templateUrl: './edit-shift.html',
  styleUrls: ['./edit-shift.scss'],
})
export class EditShiftPage implements OnInit {

  users: User[];
  shifts: ScheduledShift[];
  shift: ScheduledShift;
  date = new Date();

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

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  get f() { return this.form.controls; }

  editShift() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.dirty) {
        const fd = { ...this.shift, ...this.form.value };
        this.loading = true;
        this.shiftsService.editShift(fd)
          .pipe(
          map((res: ScheduledShift) => { this.router.navigateByUrl(`shifts/${res.id}/details`); }),
          tap(_ => console.log('Shift edited successfully!'))
        )
          .subscribe(data => data);
      }
    }
  }
}
