import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ScheduledShift} from '../../../../../interfaces/shifts.interface';
import {Observable} from "rxjs";
import {ActionSheetController, AlertController, NavController, NavParams} from "@ionic/angular";
import {ModalController} from "@ionic/angular";
import {ShiftsService} from "../../../services/shifts.service";
import {ShiftTrackerError} from "../../../services/shifts-errors.provider";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-list-shifts',
  templateUrl: './list-shifts.html',
  styleUrls: ['./list-shifts.scss'],
})
export class ListShiftsPage implements OnInit {

  shifts: ScheduledShift[] | ShiftTrackerError;
  date = new Date();
  isLoading = true;
  selectedShift: ScheduledShift;

   constructor(
    private shiftsService: ShiftsService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private actionSheetController: ActionSheetController
  ) {
  }

  onSelect(shift: ScheduledShift): void {
    this.selectedShift = shift;
  }

  ngOnInit() {
    this.loadShifts().subscribe(data => this.shifts = data);

    setInterval(() => {
      this.date = new Date();
    }, 1000);
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
    return this.shiftsService.loadAllUpcomingShifts()
      .pipe(
        tap(async (res) => {
            if (!(res instanceof ShiftTrackerError) && res.length === 0) {
              const alert = await this.alertCtrl.create({
                header: 'No Shifts Found!',
                message: 'No upcoming shifts were found in the database.',
                buttons: ['OK'] });
              await alert.present();
            }
          }
        )
      );
  }
}
