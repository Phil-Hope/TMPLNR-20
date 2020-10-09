import {Component, OnInit} from "@angular/core";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {ShiftTrackerError} from "../../../shifts/services/shifts-errors.provider";
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pending-approval-shifts',
  templateUrl: './pending-approval-shifts.html',
  styleUrls: ['./pending-approval-shifts.scss']
})
export class PendingApprovalShiftsPage implements OnInit {
  shifts: ScheduledShift[] | ShiftTrackerError;
  shift: ScheduledShift;
  date = new Date();

  constructor(
    private shiftsService: ShiftsService,
    private alertCtrl: AlertController,
    private router: Router,
    public actionSheetController: ActionSheetController
    ) {
  }

async ngOnInit() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);

    this.loadShifts().subscribe(data => this.shifts = data);
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
          text: 'delete',
          icon: 'trash-bin-outline',
          handler: () => {
            this.router.navigateByUrl(`/shifts/${id}/delete`);
          }
        },
        {
          text: 'approve',
          icon: 'checkmark-circle-outline',
          handler: () => {
            this.router.navigateByUrl(`/admin/approve-shift/${id}`);
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

  doRefresh(event){
    console.log('Refresh!');
    setTimeout(() => {
      console.log('Feeling Refreshed!');
      event.target.complete();
    }, 2000);
  }

  loadShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
    return this.shiftsService.loadAwaitingApprovalShifts()
      .pipe(
        tap(async (res) => {
          if (!(res instanceof ShiftTrackerError) && res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No Shifts Found!',
              message: 'No pending shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present;
          }
        })
      );
  }
}
