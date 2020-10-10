import { Component, OnInit } from '@angular/core';
import {ShiftsService} from "../../../services/shifts.service";
import {ScheduledShift} from "../../../../../interfaces/shifts.interface";
import {Observable} from "rxjs";
import {ShiftTrackerError} from "../../../services/shifts-errors.provider";
import {tap} from "rxjs/operators";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-approved-secondary-shifts',
  templateUrl: './list-approved-secondary-shifts.page.html',
  styleUrls: ['./list-approved-secondary-shifts.page.scss'],
})
export class ListApprovedSecondaryShiftsPage implements OnInit {

  shifts: ScheduledShift[];
  constructor(
    private shiftsService: ShiftsService,
    private alertCtrl: AlertController,
    private actionSheetController: ActionSheetController,
    private router: Router,
    ) { }

  ngOnInit() {
      this.loadShifts().subscribe((data: ScheduledShift[]) => this.shifts = data);
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
      },
        {
          text: 'comment',
          icon: 'chatbubble-outline',
          handler: () => {
            this.router.navigateByUrl(`/shifts/${id}/add-comment`);
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

  loadShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
    return this.shiftsService.loadUpcomingApprovedSecondaryShifts()
      .pipe(
        tap(async (res) => {
            if (!(res instanceof ShiftTrackerError) && res.length === 0) {
              const alert = await this.alertCtrl.create({
                header: 'No Shifts Found!',
                message: 'No Approved "Secondary" shifts were found in the database.',
                buttons: ['OK'] });
              await alert.present();
            }
          }
        )
      );
  }

}
