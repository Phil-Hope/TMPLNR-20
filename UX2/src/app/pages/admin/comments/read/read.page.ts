import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommentsService} from "../../../shifts/services/comments.service";
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
})
export class ReadPage implements OnInit {

  comment: ShiftComments;

  constructor(private route: ActivatedRoute,
              private commentsService: CommentsService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.commentsService.getCommentById(id)
      .subscribe((data: ShiftComments) => this.comment = data);
  }

}
