import { Component, OnInit } from '@angular/core';
import {ShiftsService} from "../../../services/shifts.service";
import {ScheduledShift} from "../../../../../interfaces/shifts.interface";
import {Observable} from "rxjs";
import {ShiftTrackerError} from "../../../services/shifts-errors.provider";
import {tap} from "rxjs/operators";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-pending-primary-shifts',
  templateUrl: './list-pending-primary-shifts.page.html',
  styleUrls: ['./list-pending-primary-shifts.page.scss'],
})
export class ListPendingPrimaryShiftsPage implements OnInit {

  shifts: ScheduledShift[];
  isLoading = true;

  constructor(
    private shiftsService: ShiftsService,
    private alertCtrl: AlertController,
    private router: Router,
    private actionSheetController: ActionSheetController
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

  loadShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
    return this.shiftsService.loadUpcomingPendingPrimaryShifts()
      .pipe(
        tap(async (res) => {
            if (!(res instanceof ShiftTrackerError) && res.length === 0) {
              const alert = await this.alertCtrl.create({
                header: 'No Shifts Found!',
                message: 'No Pending "Primary" Level shifts were found in the database.',
                buttons: ['OK'] });
              await alert.present();
            }
          }
        )
      );
  }
}
