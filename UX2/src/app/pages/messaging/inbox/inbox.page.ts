import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommentsService} from "../../shifts/services/comments.service";
import {Storage} from "@ionic/storage";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {User} from "../../../interfaces/user.interface";
import {UsersService} from "../../admin/users/services/users.service";
import {ShiftComments} from "../../../interfaces/shift-comments.interface";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  user: User;
  comments: ShiftComments[];

  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService,
    private storage: Storage,
    private actionSheet: ActionSheetController,
    private alertCtrl: AlertController,
    private userService: UsersService,
    private router: Router
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
    const id = await this.getStorage();
    this.getUserFromStorage(JSON.parse(id));
    this.getUsersComments(JSON.parse(id));
  }

  async presentActionSheet(id: string) {
    const actionSheet = await this.actionSheet.create({
      header: 'Actions',
      animated: true,
      buttons: [
        {
          text: 'view',
          icon: 'mail-open-outline',
          handler: () => {
            this.router.navigateByUrl(`/messaging/${id}/read`);
          }
        },
        {
          text: 'reply',
          icon: 'return-down-back-outline',
          handler: () => {
            this.router.navigateByUrl(`/messaging/${id}/reply`);
          }
        },
        {
          text: 'delete',
          icon: 'trash-bin-outline',
          handler: () => {
            this.onDeleteMessage(id);
            this.getUsersComments(this.user.id);
          }
        },
        {
          text: 'cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

 async onDeleteMessage(id: string) {
    this.commentsService.deleteComment(id)
      .pipe(tap(fresh => this.router.navigateByUrl('/messaging')))
      .subscribe(_ => console.log('Deleted!'));
  }

  async getUserFromStorage(id: string) {
    this.userService.getUserById(id)
      .subscribe((data: User) => this.user = data);
  }

  async getUsersComments(id: string) {
    this.commentsService.getUsersReadComments(id)
      .subscribe((data: ShiftComments[]) => this.comments = data);
  }
}
