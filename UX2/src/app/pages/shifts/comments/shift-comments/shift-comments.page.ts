import {Component, OnInit} from '@angular/core';
import {CommentsService} from "../../services/comments.service";
import {ActivatedRoute} from "@angular/router";
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";

@Component({
  selector: 'app-shift-comments',
  templateUrl: './shift-comments.page.html',
  styleUrls: ['./shift-comments.page.scss'],
})
export class ShiftCommentsPage implements OnInit {

  comments: ShiftComments[];

  constructor(
    private commentsService: CommentsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.commentsService.getCommentsForShift(id)
      .subscribe((data: ShiftComments[]) => this.comments = data);
  }

}
