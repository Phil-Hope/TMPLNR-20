import { Component, OnInit } from '@angular/core';
import {CommentsService} from "../../services/comments.service";
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.page.html',
  styleUrls: ['./list-comments.page.scss'],
})
export class ListCommentsPage implements OnInit {

  comments: ShiftComments[];

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.commentsService.loadAllComments()
      .subscribe((data: ShiftComments[]) => this.comments = data);
  }

}
