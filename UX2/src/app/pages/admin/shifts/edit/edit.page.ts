import {Component, OnInit} from '@angular/core';
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {UsersService} from "../../users/services/users.service";
import {User} from "../../../../interfaces/user.interface";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  shift: ScheduledShift;
  form: FormGroup;
  users: User[];

  constructor(
    private shiftsService: ShiftsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      onDuty: ['', Validators.required],
      ShiftStatus: ['', Validators.required],
      isApproved: [false, Validators.required]
    });
  }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.shiftsService.getShiftById(id)
      .subscribe((data: ScheduledShift) => this.shift = data);

    this.usersService.loadAllUsers()
      .subscribe((data: User[]) => this.users = data);
  }

  onEditShift() {
    if (this.form.valid) {
      if (this.form.dirty) {
        const fd = {...this.shift, ...this.form.value};

        this.shiftsService.editShift(fd)
          .pipe(
            tap(_ => alert('Shift edited!')),
            tap(_ => this.router.navigateByUrl(`/admin/shifts/details/${_.id}`))
          ).subscribe((data) => console.log(JSON.stringify(data)));
      }
    }
  }
}
