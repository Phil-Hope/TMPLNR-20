import {Component, OnInit} from '@angular/core';
import {User} from '../../../../../interfaces/user.interface';
import {UsersService} from "../../services/users.service";
import {UserTrackerError} from "../../services/user-errors.interface";
import {Router} from "@angular/router";
import {ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.html',
  styleUrls: ['./list-users.scss'],
})
export class ListUsersPage implements OnInit {

  users: User[] | UserTrackerError;
  user: User;

  date = new Date();

  constructor(
      private usersService: UsersService,
      private router: Router,
      private actionController: ActionSheetController
  ) {
  }

  ngOnInit() {
    this.usersService.loadAllUsers().subscribe(users => this.users = users);
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }


  async presentActionSheet(id: string) {
    const actionSheet = await this.actionController.create({
      header: 'Actions',
      buttons: [{
        text: 'view',
        icon: 'search-circle-outline',
        handler: () => {
          this.router.navigateByUrl(`/users/${id}/details`);
        }
      }, {
        text: 'edit',
        icon: 'create-outline',
        handler: () => {
          this.router.navigateByUrl(`/users/${id}/edit`);
        }
      },
        {
          text: 'shifts',
          icon: 'calendar-outline',
          handler: () => {
            this.router.navigateByUrl(`/users/${id}/shifts`);
          }
        },
        {
          text: 'delete',
          icon: 'trash-bin-outline',
          handler: () => {
            this.router.navigateByUrl(`/users/${id}/delete`);
          }
        },
        {
          text: 'cancel',
          icon: 'close',
          role: "cancel"
        }
      ]
    });
    await actionSheet.present();
  }
}
