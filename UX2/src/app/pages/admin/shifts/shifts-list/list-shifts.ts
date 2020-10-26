import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {Observable} from "rxjs";
import {ActionSheetController, AlertController, NavController, NavParams} from "@ionic/angular";
import {ModalController} from "@ionic/angular";
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-list-shifts',
  templateUrl: './list-shifts.html',
  styleUrls: ['./list-shifts.scss'],
})
export class AdminListShiftsPage implements OnInit, OnChanges {

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

  shifts: ScheduledShift[];
  date = new Date();
  isLoading = true;
  selectedShift: ScheduledShift;
  view = 'All Shifts';

  onSelect(shift: ScheduledShift): void {
    this.selectedShift = shift;
  }

  async ngOnInit() {
    await this.onLoadAllShifts();

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  async ngOnChanges(changes: SimpleChanges) {
    await this.onLoadAllShifts();
  }

  async presentActionSheet(id: string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      animated: true,
      buttons: [{
        text: 'view',
        icon: 'search-circle-outline',
        handler: () => {
          this.router.navigateByUrl(`/admin/shifts/details/${id}`);
        }
      }, {
        text: 'edit',
        icon: 'create-outline',
        handler: () => {
          this.router.navigateByUrl(`/admin/shifts/edit/${id}`);
        }
      },
        {
          text: 'Approve',
          icon: 'thumbs-up-outline',
          handler: () => {
            this.router.navigateByUrl(`/admin/shifts/approve/${id}`);
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
            this.router.navigateByUrl(`/admin/shifts/delete/${id}`);
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

  async toggleViewActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      animated: true,
      buttons: [{
        text: 'All Shifts',
        handler: () => {
          this.view = 'All Shifts';
          this.onLoadAllShifts();
        }
      },
        {
          text: 'Upcoming Shifts',
          handler: () => {
            this.view = 'Upcoming Shifts';
            this.onLoadUpcoming();
          }
        },
        {
          text: 'Past Shifts',
          handler: () => {
            this.view = 'Past Shifts';
            this.onLoadPastShifts();
          }
        },
        {
          text: 'All - Approved Shifts',
          handler: () => {
            this.view = 'Approved Shifts';
            this.onLoadApprovedShifts();
          }
        },
        {
          text: 'All - Pending Shifts',
          handler: () => {
            this.view = 'Pending Shifts';
            this.onLoadPendingShifts();
          }
        },
        {
          text: 'Approved - Primary Shifts',
          handler: () => {
            this.view = 'Approved - Primary Shifts';
            this.onLoadApprovedPrimary();
          }
        },
        {
          text: 'Approved - Secondary',
          handler: () => {
            this.view = 'Approved - Secondary';
            this.onLoadApprovedSecondary();
          }
        },
        {
          text: 'Pending Primary',
          handler: () => {
            this.view = 'Pending Primary';
            this.onLoadPendingPrimary();
          }
        },
        {
          text: 'Pending Secondary',
          handler: () => {
            this.view = 'Pending Secondary';
            this.onLoadPendingSecondary();
          }
        },
        {
          text: 'Live Shifts',
          handler: () => {
            this.view = 'Live Shifts';
            this.onLoadLiveShifts();
          }
        },
        {
          text: 'CLOSE',
          icon: 'close',
          role: "cancel",
        }
      ]
    });
    await actionSheet.present();
  }

  loadAllShifts(): Observable<ScheduledShift[]> {
    return this.shiftsService.loadAllShifts()
      .pipe(
        tap(async (res) => {
            if (res.length === 0) {
              const alert = await this.alertCtrl.create({
                header: 'No Shifts Found!',
                message: 'No shifts were found in the database.',
                buttons: ['OK']
              });
              await alert.present();
            }
          }
        )
      );
  }
  async onLoadAllShifts() {
    this.loadAllShifts().subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadUpcoming(): Observable<ScheduledShift[]> {
    return this.shiftsService.loadAllUpcomingShifts()
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
  async onLoadUpcoming() {
    this.loadUpcoming().subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPastShifts(): Observable<ScheduledShift[]> {
    return this.shiftsService.loadAllPastShifts()
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'We Looked, But there are NONE!',
              message: 'No past shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPastShifts() {
    this.loadPastShifts().subscribe((data: ScheduledShift []) => this.shifts = data);
  }

  loadApprovedShifts(): Observable<ScheduledShift []> {
    return this.shiftsService.loadAllUpcomingApprovedShifts()
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'We Looked, But there are NONE!',
              message: 'No upcoming "approved" shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
 async onLoadApprovedShifts() {
    this.loadApprovedShifts().subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPendingShifts(): Observable<ScheduledShift []> {
    return this.shiftsService.loadAwaitingApprovalShifts()
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'We Looked, But there are NONE!',
              message: 'No upcoming "pending approval" shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPendingShifts() {
    this.loadPendingShifts().subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadLiveShifts(): Observable<ScheduledShift []> {
    return this.shiftsService.loadLiveShifts()
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'We Looked, But there are NONE!',
              message: 'No "live" shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadLiveShifts() {
    this.loadLiveShifts().subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPendingPrimary(): Observable<ScheduledShift []> {
    return this.shiftsService.loadUpcomingPendingPrimaryShifts()
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'We Looked, But there are NONE!',
              message: 'No upcoming "pending primary" shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPendingPrimary() {
    this.loadPendingPrimary().subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPendingSecondary(): Observable<ScheduledShift []> {
    return this.shiftsService.loadUpcomingPendingSecondaryShifts()
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'We Looked, But there are NONE!',
              message: 'No upcoming "pending secondary" shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPendingSecondary() {
    this.loadPendingSecondary().subscribe((data: ScheduledShift[]) => this.shifts = data);
  }


  loadApprovedPrimary(): Observable<ScheduledShift[]> {
    return this.shiftsService.loadUpcomingApprovedPrimaryShifts()
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'We Looked, But there are NONE!',
              message: 'No upcoming "approved primary" shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadApprovedPrimary() {
    this.loadApprovedPrimary().subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadApprovedSecondary(): Observable<ScheduledShift[]> {
    return this.shiftsService.loadUpcomingApprovedSecondaryShifts()
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
  async onLoadApprovedSecondary() {
    this.loadApprovedSecondary().subscribe((data: ScheduledShift[]) => this.shifts = data);
  }


}
