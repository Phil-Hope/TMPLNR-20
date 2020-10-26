import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {CommentsService} from "../shifts/services/comments.service";
import {User} from "../../interfaces/user.interface";
import {UsersService} from "../admin/users/services/users.service";
import {ShiftComments} from "../../interfaces/shift-comments.interface";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit, OnChanges {

  user: User;
  comments: ShiftComments[];
  comment: ShiftComments;

  constructor(
    private commentsService: CommentsService,
    private userService: UsersService,
    private alertCtrl: AlertController,
    private actionSheet: ActionSheetController,
    private storage: Storage,
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
    const value = await this.getStorage();
    await this.getUserFromStorage(JSON.parse(value));
    await this.getUsersComments(JSON.parse(value));
  }

  async ngOnChanges(changes: SimpleChanges) {
    await this.getUserFromStorage(this.user.id);
    await this.getUsersComments(this.user.id);
  }

  async presentActionSheet(id: string) {
    const actionSheet = await this.actionSheet.create({
        header: 'Actions',
        animated: true,
        buttons: [
          {
            text: 'open',
            icon: 'mail-open-outline',
            handler: () => {
              this.router.navigateByUrl(`/messaging/${id}/read`);
            }
          },
          {
            text: 'delete',
            icon: 'trash-bin-outline',
            handler: () => {
              this.onDeleteMessage(id);
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
      .subscribe(data => console.log(JSON.stringify(data)));
  }

  async getUsersComments(id: string) {
    this.commentsService.getUsersUnreadComments(id)
      .subscribe((data: ShiftComments[]) => this.comments = data);
  }

  async getUserFromStorage(id: string) {
    this.userService.getUserById(id)
      .subscribe((data: User) => this.user = data);
  }
}
