import {Component, OnInit} from '@angular/core';
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
export class DetailsPage implements OnInit {

  comment: ShiftComments[];
  shift: ScheduledShift;

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

  getShift(id: string) {
    this.shiftsService.getShiftById(id)
      .subscribe((data: ScheduledShift) => this.shift = data);
  }

  getComments(id: string) {
    this.commentsService.getCommentsForShift(id)
      .subscribe((data: ShiftComments[]) => this.comment = data);
  }
}
