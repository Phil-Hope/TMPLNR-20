import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user.interface';
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import {UsersService} from "../admin/users/services/users.service";
import {ScheduledShift} from "../../interfaces/shifts.interface";
import {Storage} from "@ionic/storage";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfilePage implements OnInit {

  user: User;
  users: User[];
  shifts: ScheduledShift[];
  shift: ScheduledShift;
  date = new Date();

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    private alertCtrl: AlertController,
    private actionSheetController: ActionSheetController
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
    await this.onLoadUpcomingApproved(JSON.parse(value));
  }

  async presentActionSheet(id: string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'view',
        icon: 'search-circle-outline',
        handler: () => {
          this.router.navigateByUrl(`/shifts/${id}/details`);
        }
      }, {
        text: 'edit',
        icon: 'create-outline',
        handler: () => {
          this.router.navigateByUrl(`/shifts/${id}/edit`);
        }
      },
        {
          text: 'comment',
          icon: 'chatbubble-outline',
          handler: () => {
            this.router.navigateByUrl(`/shifts/${id}/add-comment`);
          }
        },
        {
          text: 'delete',
          icon: 'trash-bin-outline',
          handler: () => {
            this.router.navigateByUrl(`/shifts/${id}/delete`);
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

  async getUserFromStorage(id: string) {
    this.userService.getUserById(id).subscribe((data: User) => this.user = data);
  }

  loadUpcomingApproved(id: string): Observable<ScheduledShift[]> {
    return this.userService.loadUsersUpcomingApprovedShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'We Looked, But there are NONE!',
              message: 'No upcoming approved shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadUpcomingApproved(id: string) {
    this.userService.loadUsersUpcomingApprovedShifts(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  viewShiftDetails(): void {
    this.router.navigateByUrl('/users/:id/shifts');
  }
}
