import { Component, OnInit } from '@angular/core';
import {ShiftsService} from "../../../services/shifts.service";
import {ScheduledShift} from "../../../../../interfaces/shifts.interface";
import {Observable} from "rxjs";
import {ShiftTrackerError} from "../../../services/shifts-errors.provider";
import {tap} from "rxjs/operators";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-approved-shifts',
  templateUrl: './list-approved-shifts.page.html',
  styleUrls: ['./list-approved-shifts.page.scss'],
})
export class ListApprovedShiftsPage implements OnInit {

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
    return this.shiftsService.loadAllUpcomingApprovedShifts()
      .pipe(
        tap(async (res) => {
            if (!(res instanceof ShiftTrackerError) && res.length === 0) {
              const alert = await this.alertCtrl.create({
                header: 'No Shifts Found!',
                message: 'No Approved Shifts were found in the database.',
                buttons: ['OK'] });
              await alert.present();
            }
          }
        )
      );
  }
}
