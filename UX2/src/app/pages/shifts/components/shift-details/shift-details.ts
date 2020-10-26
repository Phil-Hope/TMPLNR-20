import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {ShiftsService} from "../../services/shifts.service";
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";
import {CommentsService} from "../../services/comments.service";
import {Storage} from "@ionic/storage";
import {AuthenticationService} from "../../../../authentication/authentication.service";

@Component({
  selector: 'app-shift-details',
  templateUrl: './shift-details.html',
  styleUrls: ['./shift-details.scss'],
})
export class ShiftDetailsPage implements OnInit, OnChanges {

  shift: ScheduledShift;
  shift$: Observable<ScheduledShift>;
  comments: ShiftComments[];
  date = new Date();
  userIsAdmin: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shiftsService: ShiftsService,
    private commentsService: CommentsService,
    private storage: Storage,
    private authService: AuthenticationService
  ) {
    this.authService.isAdmin.asObservable()
      .subscribe((data) => this.userIsAdmin = data);
    this.isAdmin();
  }

  async getAdminStatus(): Promise<any> {
    try {
      const result = await this.storage.get('roles');
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async isAdmin() {
    const value = await this.getAdminStatus();
    if (value.length === 2) {
      this.userIsAdmin = true;
    } else {
      this.userIsAdmin = false;
    }
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.loadShift(id);
    this.getComments(id);

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadShift(this.shift.id);
    this.getComments(this.shift.id);
  }

  loadShift(id: string) {
    this.shiftsService.getShiftById(id)
      .subscribe((data: ScheduledShift) => this.shift = data);
  }

  getComments(id: string) {
    this.commentsService.getCommentsForShift(id).subscribe((data: ShiftComments[]) => this.comments = data);
  }
}
