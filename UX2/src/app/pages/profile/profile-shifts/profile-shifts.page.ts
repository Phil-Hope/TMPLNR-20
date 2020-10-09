import {Component, OnInit} from '@angular/core';
import {ScheduledShift} from "../../../interfaces/shifts.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../admin/users/services/users.service";
import {ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'app-profile-shifts',
  templateUrl: './profile-shifts.page.html',
  styleUrls: ['./profile-shifts.page.scss'],
})
export class ProfileShiftsPage implements OnInit {

  shifts: ScheduledShift[];
  approvedShifts: [];
  pendingShifts: [];
  shift: ScheduledShift;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private actionSheetController: ActionSheetController
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.loadAllUsersShifts(id).subscribe((data: ScheduledShift[]) => this.shifts = data);
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

}
