import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {User} from "../../../../interfaces/user.interface";
import {UsersService} from "../../users/services/users.service";
import {AlertController} from "@ionic/angular";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-approve-shift',
  templateUrl: './approve-shift.html',
  styleUrls: ['./approve-shift.scss']
})
export class ApproveShiftPage implements OnInit {

  shift: ScheduledShift;
  form: FormGroup;
  users: User[];
  loading: Observable<boolean>;
  date = new Date();
  id: string;
  isSubmitted: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shiftService: ShiftsService,
    private fb: FormBuilder,
    private userService: UsersService,
    private alertCtrl: AlertController
  ) {

    this.form = this.fb.group({
      id: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      onDuty: ['', Validators.required],
      ShiftStatus: ['', Validators.required],
      isApproved: [true]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getShiftToApprove(id)
      .subscribe((data: ScheduledShift) => this.shift = data);

    this.getUsersToSelect()
      .subscribe((data: User[]) => this.users = data);
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  getUsersToSelect(): Observable<User[]> {
    return this.userService.loadAllUsers();
  }

  getShiftToApprove(id: string): Observable<ScheduledShift> {
    return this.shiftService.getShiftById(id);
  }

  async approveShift() {
    if (this.form.valid) {
        this.isSubmitted = true;
        const s = {...this.shift, ...this.form.value};
        this.shiftService.approveShift(s)
          .pipe(
            tap(_ => this.router.navigateByUrl('/admin/shifts/details/' + this.shift.id))
          )
          .subscribe(data => this.shift = data);
      }
  }
}
