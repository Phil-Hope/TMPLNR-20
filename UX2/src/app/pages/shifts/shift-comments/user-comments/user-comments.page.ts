import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../admin/users/services/users.service";
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";
import {User} from "../../../../interfaces/user.interface";
import {CommentsService} from "../../services/comments.service";

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.page.html',
  styleUrls: ['./user-comments.page.scss'],
})
export class UserCommentsPage implements OnInit {

  comments: ShiftComments[];
  user: User;

  constructor(
    private userService: UsersService,
    private commentService: CommentsService
  ) {
  }

  ngOnInit() {
  }

  getUsersComments(id: string) {
    this.commentService.getUsersComments(id)
      .subscribe((data: ShiftComments[]) => this.comments = data);
  }

  getUser(id: string) {
    this.userService.getUserById(id).subscribe((data: User) => this.user = data);
  }

}
