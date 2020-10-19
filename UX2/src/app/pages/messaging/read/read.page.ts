import {Component, OnInit} from '@angular/core';
import {CommentsService} from "../../shifts/services/comments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShiftComments} from "../../../interfaces/shift-comments.interface";
import {map, tap} from "rxjs/operators";
import {ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
})
export class ReadPage implements OnInit {

  comment: ShiftComments;

  constructor(
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private router: Router,
    private actionSheet: ActionSheetController
    ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.commentsService.getCommentById(id)
      .subscribe((data: ShiftComments) => this.comment = data);
    this.commentsService.markAsRead(id)
      .subscribe((data: ShiftComments) => this.comment = data);
  }

  async presentActionSheet(id: string) {
    const actionSheet = await this.actionSheet.create({
      header: 'Delete Message?',
      animated: true,
      buttons: [
        {
          text: 'OK',
          icon: 'checkbox-outline',
          handler: () => {
            this.onDeleteMessage(id);
          }
        },
        {
          text: 'Cancel',
          icon: 'cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  onDeleteMessage(id: string) {
    this.commentsService.deleteComment(id)
      .pipe(
        map(() => alert(`Message from ${this.comment.authoredBy.firstName} ${this.comment.authoredBy.lastName} Deleted`)),
        tap(_ => this.router.navigateByUrl('/messaging'))
      )
      .subscribe(data => console.log(JSON.stringify(data)));
  }
}
