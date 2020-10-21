import {Component, OnInit} from '@angular/core';
import {ScheduledShift} from "../../../interfaces/shifts.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../admin/users/services/users.service";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {User} from "../../../interfaces/user.interface";

@Component({
  selector: 'app-profile-shifts',
  templateUrl: './profile-shifts.page.html',
  styleUrls: ['./profile-shifts.page.scss'],
})
export class ProfileShiftsPage implements OnInit {

  shifts: ScheduledShift[];
  approvedShifts: [];
  pendingShifts: [];
  user: User;
  shift: ScheduledShift;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private actionSheetController: ActionSheetController,
    private alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.getUserById(id).subscribe((data: User) => this.user = data);
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

  async toggleAllActionSheet(id: string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'All Shifts',
      cssClass: ['action-sheet-group'],
      animated: true,
      buttons: [{
        text: 'View All',
        handler: () => {
          this.onLoadAllShifts(id);
        }
      },
        {
          text: 'Primary(All)',
          handler: () => {
            this.onLoadPrimaryShifts(id);
          }
        },
        {
          text: 'Primary(Approved)',
          handler: () => {
            this.onLoadApprovedPrimary(id);
          }
        },
        {
          text: 'Primary(Pending)',
          handler: () => {
            this.onLoadPendingPrimary(id);
          }
        },
        {
          text: 'Secondary(All)',
          handler: () => {
            this.onLoadSecondary(id);
          }
        },
        {
          text: 'Secondary(Approved)',
          handler: () => {
            this.onLoadApprovedSecondary(id);
          }
        },
        {
          text: 'Secondary(Pending)',
          handler: () => {
            this.onLoadPendingSecondary(id);
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

  async toggleUpcomingActionSheet(id: string) {
    const actionSheet4 = await this.actionSheetController.create({
      header: 'Upcoming Shifts',
      cssClass: ['action-sheet-group'],
      animated: true,
      buttons: [        {
        text: 'View All',
        handler: () => {
          this.onLoadUpcoming(id);
        }
      },
        {
          text: 'Primary(All)',
          handler: () => {
            this.onLoadUpcomingPrimary(id);
          }
        },
        {
          text: 'Primary(Approved)',
          handler: () => {
            this.onLoadUpcomingApprovedPrimary(id);
          }
        },
        {
          text: 'Primary(Pending)',
          handler: () => {
            this.onLoadUpcomingPendingPrimary(id);
          }
        },
        {
          text: 'Secondary(All)',
          handler: () => {
            this.onLoadUpcomingSecondary(id);
          }
        },
        {
          text: 'Secondary(Approved)',
          handler: () => {
            this.onLoadUpcomingApprovedSecondary(id);
          }
        },
        {
          text: 'Secondary(Pending)',
          handler: () => {
            this.onLoadUpcomingPendingSecondary(id);
          }
        },
        {
          text: 'CLOSE',
          icon: 'close',
          role: "cancel",
        }
      ]
    });
    await actionSheet4.present();
  }

  async togglePreviousActionSheet(id: string) {
    const actionSheet3 = await this.actionSheetController.create({
      header: 'Past Shifts',
      cssClass: 'my-custom-class',
      animated: true,
      buttons: [        {
        text: 'View All',
        cssClass: 'action-sheet-group',
        handler: () => {
          this.onLoadPast(id);
        }
      },
        {
          text: 'Primary(All)',
          cssClass: 'my-custom-class',
          handler: () => {
            this.onLoadPastPrimary(id);
          }
        },
        {
          text: 'Primary(Approved)',
          cssClass: 'my-custom-class',
          handler: () => {
            this.onLoadPastApprovedPrimary(id);
          }
        },
        {
          text: 'Primary(Pending)',
          cssClass: 'my-custom-class',
          handler: () => {
            this.onLoadPastPendingPrimary(id);
          }
        },
        {
          text: 'Secondary(All)',
          cssClass: 'my-custom-class',
          handler: () => {
            this.onLoadPastSecondary(id);
          }
        },
        {
          text: 'Secondary(Approved)',
          cssClass: 'my-custom-class',
          handler: () => {
            this.onLoadPastApprovedSecondary(id);
          }
        },
        {
          text: 'Secondary(Pending)',
          cssClass: 'my-custom-class',
          handler: () => {
            this.onLoadPastPendingSecondary(id);
          }
        },
        {
          text: 'CLOSE',
          icon: 'close',
          role: "cancel",
        }
      ]
    });
    await actionSheet3.present();
  }


  loadAllShifts(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadAllUsersShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }

  async onLoadAllShifts(id: string) {
    this.loadAllShifts(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadUpcoming(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersUpcomingShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No upcoming shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }

  async onLoadUpcoming(id: string) {
    this.loadUpcoming(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPast(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersPastShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No previous shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }

  async onLoadPast(id: string) {
    this.loadPast(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPending(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersPendingShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No "Pending Approval" shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPending(id: string) {
    this.loadPending(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPastPending(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersPastPendingShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No previous "Pending Approval" shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPastPending(id: string) {
    this.loadPastPending(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadUpcomingPending(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersUpcomingPendingShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No upcoming "Pending Approval" shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadUpcomingPending(id: string) {
    this.loadUpcomingPending(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }


  loadApproved(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersApprovedShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No "Approved" shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadApproved(id: string) {
    this.loadApproved(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadUpcomingApproved(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersUpcomingApprovedShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No upcoming "Approved" shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadUpcomingApproved(id: string) {
    this.loadUpcomingApproved(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPastApproved(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersPastApprovedShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No previous "Approved" shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPastApproved(id: string) {
    this.loadPastApproved(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPrimaryShifts(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersPrimaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No Primary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPrimaryShifts(id: string) {
    this.loadPrimaryShifts(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadUpcomingPrimary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersUpcomingPrimaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No upcoming Primary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadUpcomingPrimary(id: string) {
    this.loadUpcomingPrimary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPastPrimary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersPastPrimaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No previous Primary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPastPrimary(id: string) {
    this.loadPastPrimary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadApprovedPrimary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersApprovedPrimaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No "Approved" Primary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadApprovedPrimary(id: string) {
    this.loadApprovedPrimary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadUpcomingApprovedPrimary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersUpcomingApprovedPrimaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No upcoming "Approved" Primary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadUpcomingApprovedPrimary(id: string) {
    this.loadUpcomingApprovedPrimary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPastApprovedPrimary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersPastApprovedPrimaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No previous "Approved" Primary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPastApprovedPrimary(id: string) {
    this.loadPastApprovedPrimary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPendingPrimary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersPendingPrimaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No "Pending Approval" Primary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPendingPrimary(id: string) {
    this.loadPendingPrimary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadUpcomingPendingPrimary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersUpcomingPendingPrimaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No upcoming "Pending Approval" Primary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadUpcomingPendingPrimary(id: string) {
    this.loadUpcomingPendingPrimary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPastPendingPrimary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersPastPendingPrimaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No previous "Pending Approval" Primary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPastPendingPrimary(id: string) {
    this.loadPastPendingPrimary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadSecondary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersSecondaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No Secondary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadSecondary(id: string) {
    this.loadSecondary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadUpcomingSecondary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersUpcomingSecondaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No upcoming Secondary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadUpcomingSecondary(id: string) {
    this.loadUpcomingSecondary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPastSecondary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersPastSecondaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No previous Secondary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPastSecondary(id: string) {
    this.loadPastSecondary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadApprovedSecondary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersApprovedSecondaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No "Approved" Secondary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadApprovedSecondary(id: string) {
    this.loadApprovedSecondary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadUpcomingApprovedSecondary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersUpcomingApprovedSecondaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No upcoming "Approved" Secondary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadUpcomingApprovedSecondary(id: string) {
    this.loadUpcomingApprovedSecondary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPastApprovedSecondary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersPastApprovedSecondaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No previous "Approved" Secondary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPastApprovedSecondary(id: string) {
    this.loadPastApprovedSecondary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPendingSecondary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersPendingSecondaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No "pending approval" Secondary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPendingSecondary(id: string) {
    this.loadPendingSecondary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadUpcomingPendingSecondary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersUpcomingPendingSecondaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No upcoming "Pending Approval" Secondary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadUpcomingPendingSecondary(id: string) {
    this.loadUpcomingPendingSecondary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  loadPastPendingSecondary(id: string): Observable<ScheduledShift[]> {
    return this.usersService.loadUsersPastPendingSecondaryShifts(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
            const alert = await this.alertCtrl.create({
              header: 'No shifts found..',
              message: 'No previous "Pending Approval" Secondary Level shifts were found in the database.',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      );
  }
  async onLoadPastPendingSecondary(id: string) {
    this.loadPastPendingSecondary(id)
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }
}
