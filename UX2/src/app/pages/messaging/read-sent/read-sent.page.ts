import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommentsService} from "../../shifts/services/comments.service";
import {ShiftComments} from "../../../interfaces/shift-comments.interface";

@Component({
  selector: 'app-read-sent',
  templateUrl: './read-sent.page.html',
  styleUrls: ['./read-sent.page.scss'],
})
export class ReadSentPage implements OnInit, OnChanges {

  comment: ShiftComments;

  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadComment(id);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadComment(this.comment.id);
  }

  loadComment(id: string) {
    this.commentsService.getCommentById(id)
      .subscribe((data: ShiftComments) => this.comment = data);
  }

}
