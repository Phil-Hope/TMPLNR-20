import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommentsService} from "../../services/comments.service";
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.page.html',
  styleUrls: ['./view-comment.page.scss'],
})
export class ViewCommentPage implements OnInit {

  comment: ShiftComments;

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentsService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.commentService.getCommentById(id)
      .subscribe((data: ShiftComments) => this.comment = data);
  }

}
