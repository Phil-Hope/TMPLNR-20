import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ScheduledShift} from '../../../../interfaces/shifts.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from "rxjs";
import {User} from "../../../../interfaces/user.interface";
import {UsersService} from "../../../users/services/users.service";
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

    this.getShiftForEdit().subscribe(shift => this.shift = shift);

    this.form = this.fb.group({
      start: '',
      end: '',
      onDuty: '',
      ShiftStatus: '',
      isApproved: [false]
    });
  }

  getShiftForEdit(): Observable<ScheduledShift> {
    const id = this.route.snapshot.paramMap.get('id');
    return this.shiftsService.getShiftById(id);
  }

  get f() { return this.form.controls; }

  editShift() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.shiftsService.editShift(
        this.f.start.value,
        this.f.end.value,
        this.f.onDuty.value,
        this.f.ShiftStatus.value,
        this.f.isApproved.value,
    ).pipe(
        map((res: ScheduledShift) => { this.router.navigateByUrl(`shifts/${res.id}/details`); }),
        tap(_ => console.log('Shift edited successfully!'))
    )
        .subscribe(data => data);
  }

}
