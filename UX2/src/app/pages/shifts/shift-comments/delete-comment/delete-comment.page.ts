import {Component, OnInit} from '@angular/core';
import {CommentsService} from "../../services/comments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";
import {map, tap} from "rxjs/operators";
import {User} from "../../../../interfaces/user.interface";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../../admin/users/services/users.service";

@Component({
    selector: 'app-delete-comment',
    templateUrl: './delete-comment.page.html',
    styleUrls: ['./delete-comment.page.scss'],
})
export class DeleteCommentPage implements OnInit {

    comment: ShiftComments;
    user: User;

    constructor(
        private commentService: CommentsService,
        private route: ActivatedRoute,
        private router: Router,
        private storage: Storage,
        private userService: UsersService
    ) {
    }

  async getStorage(): Promise<any> {
    try {
      const result = await this.storage.get('id');
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

   async ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      this.commentService.getCommentById(id)
            .subscribe((data: ShiftComments) => this.comment = data);

      const value = await this.getStorage();
      await this.getUserFromStorage(JSON.parse(value));
    }

  async getUserFromStorage(id: string) {
    this.userService.getUserById(id).subscribe((data: User) => this.user = data);
  }

    deleteComment(id: string) {
      this.commentService.deleteComment(id)
        .pipe(
          tap(_ => alert('Comment deleted:' + JSON.stringify(_))),
          map(_ => this.router.navigateByUrl('/shift-comments'))
        ).subscribe(data => data);
    }
}
