import { Component, OnInit } from '@angular/core';
import {CommentsService} from "../../services/comments.service";
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.page.html',
  styleUrls: ['./list-comments.page.scss'],
})
export class ListCommentsPage implements OnInit {

  comments: ShiftComments[];

  constructor(
    private commentsService: CommentsService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.commentsService.loadAllComments()
      .pipe(
        tap(async (res) => {
            if (res.length === 0) {
              const alert = await this.alertCtrl.create({
                header: 'No Comments Found!',
                message: 'No comments were found in the database.',
                buttons: ['OK']
              });
              await alert.present();
            }
          }
        )
      )
      .subscribe((data: ShiftComments[]) => this.comments = data);
  }

}
