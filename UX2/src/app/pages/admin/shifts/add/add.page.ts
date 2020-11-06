import {Component, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {Router} from "@angular/router";
import {User} from "../../../../interfaces/user.interface";
import {UsersService} from "../../users/services/users.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  shift: ScheduledShift;
  users: User[];
  form: FormGroup;
  submitted = false;
  date = new Date();

  constructor(
    private fb: FormBuilder,
    private shiftsService: ShiftsService,
    private router: Router,
    private usersService: UsersService
  ) {
    this.form = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      onDuty: ['', Validators.required],
      ShiftStatus: ['', Validators.required],
      isApproved: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.usersService.loadAllUsers()
      .subscribe((data: User[]) => this.users = data);

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  addShift() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.dirty) {
        const fd = {...this.shift, ...this.form.value};

        this.shiftsService.addShift(fd)
          .pipe(
            map((res: ScheduledShift) => {
              this.router.navigateByUrl(`/admin/shifts/details/${res.id}`);
            })
          )
          .subscribe(data => console.log(data));
      }
    }
  }
}
