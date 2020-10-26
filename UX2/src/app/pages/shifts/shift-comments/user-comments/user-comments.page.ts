import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../admin/users/services/users.service";
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";
import {User} from "../../../../interfaces/user.interface";
import {CommentsService} from "../../services/comments.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";

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
    private commentService: CommentsService,
    private alertCtrl: AlertController,
    private storage: Storage
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
   await this.getUser(JSON.parse(value));
   await this.getUsersComments(JSON.parse(value))
     .subscribe((data: ShiftComments[]) => this.comments = data);
  }

  getUsersComments(id: string): Observable<ShiftComments[]> {
    return this.commentService.getUsersComments(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No comments found!',
              message: 'No comments were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }

  getUser(id: string) {
    this.userService.getUserById(id)
      .subscribe((data: User) => this.user = data);
  }

}
