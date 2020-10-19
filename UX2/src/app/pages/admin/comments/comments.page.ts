import { Component, OnInit } from '@angular/core';
import {CommentsService} from "../../shifts/services/comments.service";
import {UsersService} from "../users/services/users.service";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {ShiftComments} from "../../../interfaces/shift-comments.interface";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  comments: ShiftComments[];

  constructor(
    private commentsService: CommentsService,
    private usersService: UsersService,
    private actionSheet: ActionSheetController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.commentsService.loadAllComments()
      .subscribe((data: ShiftComments[]) => this.comments = data);
  }

}
