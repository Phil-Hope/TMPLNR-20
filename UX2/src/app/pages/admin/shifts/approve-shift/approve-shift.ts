import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {ShiftTrackerError} from "../../../shifts/services/shifts-errors.interface";
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {User} from "../../../../interfaces/user.interface";
import {UserTrackerError} from "../../users/services/user-errors.interface";
import {UsersService} from "../../users/services/users.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-approve-shift',
  templateUrl: './approve-shift.html',
  styleUrls: ['./approve-shift.scss']
})
export class ApproveShiftPage implements OnInit {

  shift: ScheduledShift | ShiftTrackerError;
  form: FormGroup;
  users: User[] | UserTrackerError;
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
  }

  ngOnInit() {

    this.form = this.fb.group({
      id: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      onDuty: ['', Validators.required],
      ShiftStatus: ['', Validators.required],
      isApproved: ['', Validators.required]
    });
    this.getShiftToDisplay().subscribe(data => this.shift = data);
    this.getUsersToSelect().subscribe(data => this.users = data);

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  getUsersToSelect(): Observable<User[] | UserTrackerError> {
    return this.userService.loadAllUsers();
  }

  getShiftToDisplay(): Observable<any> {
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id');
      });
    return this.shiftService.getShiftById(this.id);
  }

  async approveShift() {
    if (this.form.valid) {
      if (this.form.dirty) {
        this.isSubmitted = true;
        const s = {...this.shift, ...this.form.value};
        this.shiftService.approveShift(s)
          .subscribe(data => this.shift = data);
      }
      if (this.isSubmitted === true) {
        await this.router.navigateByUrl('/admin/pending-shifts');
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error Submitting Form',
        message: 'Form Failed To Submit',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
