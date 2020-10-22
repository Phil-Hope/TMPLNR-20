import {Component, OnInit} from '@angular/core';
import {CommentsService} from "../../shifts/services/comments.service";
import {UsersService} from "../../admin/users/services/users.service";
import {Storage} from "@ionic/storage";
import {AlertController} from "@ionic/angular";
import {ShiftComments} from "../../../interfaces/shift-comments.interface";
import {User} from "../../../interfaces/user.interface";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sent',
  templateUrl: './sent.page.html',
  styleUrls: ['./sent.page.scss'],
})
export class SentPage implements OnInit {

  comments: ShiftComments[];
  user: User;

  constructor(
    private commentService: CommentsService,
    private userService: UsersService,
    private storage: Storage,
    private alertCtrl: AlertController,
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
    await this.onLoadSentMessages(JSON.parse(value));
  }

  async getUserFromStorage(id: string) {
    this.userService.getUserById(id)
      .subscribe((data: User) => this.user = data);
  }

  loadSentMessages(id: string): Observable<ShiftComments[]> {
    return this.commentService.getUsersSentMessages(id)
      .pipe(
        tap(async res => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No Sent Messages Found',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
 async onLoadSentMessages(id: string) {
    return this.loadSentMessages(id)
      .subscribe((data: ShiftComments[]) => this.comments = data);
  }
}
