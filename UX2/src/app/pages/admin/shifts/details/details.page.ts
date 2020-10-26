import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {ActivatedRoute} from "@angular/router";
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {CommentsService} from "../../../shifts/services/comments.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnChanges {

  comments: ShiftComments[];
  shift: ScheduledShift;
  date = new Date();

  constructor(
    private route: ActivatedRoute,
    private shiftsService: ShiftsService,
    private commentsService: CommentsService,
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getShift(id);
    this.getComments(id);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getShift(this.shift.id);
    this.getComments(this.shift.id);
  }

  getShift(id: string) {
    this.shiftsService.getShiftById(id)
      .subscribe((data: ScheduledShift) => this.shift = data);
  }

  getComments(id: string) {
    this.commentsService.getCommentsForShift(id)
      .subscribe((data: ShiftComments[]) => this.comments = data);
  }
}
