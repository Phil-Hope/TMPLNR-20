import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {ShiftsService} from "../../services/shifts.service";
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";
import {CommentsService} from "../../services/comments.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-shift-details',
  templateUrl: './shift-details.html',
  styleUrls: ['./shift-details.scss'],
})
export class ShiftDetailsPage implements OnInit {

  shift: ScheduledShift;
  shift$: Observable<ScheduledShift>;
  comments: ShiftComments[];
  date = new Date();
  count: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shiftsService: ShiftsService,
    private commentsService: CommentsService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.shiftsService.getShiftById(id)
      .subscribe((data: ScheduledShift) => this.shift = data);

    this.getComments(id);

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  getComments(id: string) {
    this.commentsService.getCommentsForShift(id).subscribe((data: ShiftComments[]) => this.comments = data);
  }
}
