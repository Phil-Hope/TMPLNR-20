import {Component, OnInit} from '@angular/core';
import {ScheduledShift} from '../../../../interfaces/shifts.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../interfaces/user.interface';
import {map} from "rxjs/operators";
import {ShiftsService} from "../../services/shifts.service";
import {UsersService} from "../../../admin/users/services/users.service";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";

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
  user: User;
  users: User[];
  form: FormGroup;
  date = new Date();

  constructor(
      private fb: FormBuilder,
      private shiftsService: ShiftsService,
      private usersService: UsersService,
      private router: Router,
      private storage: Storage,
  ) {
    this.form = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      onDuty: ['', Validators.required],
      ShiftStatus: ['', Validators.required],
      isApproved: [false, Validators.required]
    });
  }

  async getStorage(): Promise<any> {
    try {
      const result = await this.storage.get('id');
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

 async ngOnInit() {
    const value = await this.getStorage();
    await this.getUserFromStorage(JSON.parse(value));

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  async getUserFromStorage(id: string) {
    this.usersService.getUserById(id).subscribe((data: User) => this.user = data);
  }

  addShift() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.dirty) {
        const f = {...this.shift, ...this.form.value};

        this.loading = true;
        this.shiftsService.addShift(f)
        .pipe(
          map((res: ScheduledShift) => {
            this.router.navigateByUrl(`/shifts/${res.id}/details`);
          })
        )
        .subscribe(data => console.log(data));
      }
    }
  }
}
