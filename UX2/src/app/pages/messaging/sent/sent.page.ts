import {Component, OnInit} from '@angular/core';
import {CommentsService} from "../../shifts/services/comments.service";
import {UsersService} from "../../admin/users/services/users.service";
import {Storage} from "@ionic/storage";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {ShiftComments} from "../../../interfaces/shift-comments.interface";
import {User} from "../../../interfaces/user.interface";

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
    private actionSheet: ActionSheetController,
    private alertCtrl: AlertController
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
  }

  async getUserFromStorage(id: string) {
    this.userService.getUserById(id)
      .subscribe((data: User) => this.user = data);
  }
}
