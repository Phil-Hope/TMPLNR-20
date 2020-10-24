import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommentsService} from "../../../shifts/services/comments.service";
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {

  comment: ShiftComments;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentsService: CommentsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.commentsService.getCommentById(id)
      .subscribe((data: ShiftComments) => this.comment = data);
  }

  onDeleteComment(id: string) {
    this.commentsService.deleteComment(id)
      .pipe(
        tap(_ => alert('Comment Deleted!')),
        tap(_ => this.router.navigateByUrl('/admin'))
      )
      .subscribe((data) => console.log(JSON.stringify(data)));
  }
}
