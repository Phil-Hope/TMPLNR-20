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

    shifts: ScheduledShift[] | ShiftTrackerError;
    date = new Date();
    isLoading = true;
    selectedShift: ScheduledShift;

    load;

    onSelect(shift: ScheduledShift): void {
        this.selectedShift = shift;
    }

    ngOnInit() {
        this.loadUpcoming().subscribe(data => this.shifts = data);

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


    async toggleViewActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Actions',
            buttons: [{
                text: 'All Shifts',
                handler: () => {
                    this.onLoadAllShifts();
                }
            }, {
                text: 'Past Shifts',
                handler: () => {
                    this.onLoadPastShifts();
                }
            },
                {
                    text: 'All - Approved Shifts',
                    handler: () => {
                        this.onLoadApprovedShifts();
                    }
                },
                {
                    text: 'All - Pending Shifts',
                    handler: () => {
                        this.onLoadPendingShifts();
                    }
                },
                {
                    text: 'Approved - Primary Shifts',
                    handler: () => {
                        this.onLoadApprovedPrimary();
                    }
                },
                {
                    text: 'Approved - Secondary',
                    handler: () => {
                        this.onLoadPendingShifts();
                    }
                },
                {
                    text: 'Pending Primary',
                    handler: () => {
                        this.onLoadPendingPrimary();
                    }
                },
                {
                    text: 'Pending Secondary',
                    handler: () => {
                        this.onLoadPendingSecondary();
                    }
                },
                {
                    text: 'Live Shifts',
                    handler: () => {
                        this.onLoadLiveShifts();
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

    loadAllShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
        return this.shiftsService.loadAllShifts()
            .pipe(
                tap(async (res) => {
                        if (!(res instanceof ShiftTrackerError) && res.length === 0) {
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

    onLoadAllShifts() {
        this.loadAllShifts().subscribe((data: ScheduledShift[]) => this.shifts = data);
    }

    loadUpcoming(): Observable<ScheduledShift[] | ShiftTrackerError> {
        return this.shiftsService.loadAllUpcomingShifts()
            .pipe(
                tap(async (res) => {
                    if (!(res instanceof ShiftTrackerError) && res.length === 0) {
                        const alert = await this.alertCtrl.create({
                            header: 'None Found',
                            message: 'No upcoming approved shifts were found in the database!',
                            buttons: ['OK']
                        });
                        await alert.present();
                    }
                })
            );
    }

    onLoadUpcoming() {
        this.loadUpcoming().subscribe((data: ScheduledShift[]) => this.shifts = data);
    }

    loadPastShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
        return this.shiftsService.loadAllPastShifts()
            .pipe(
                tap(async (res) => {
                    if (!(res instanceof ShiftTrackerError) && res.length === 0) {
                        const alert = await this.alertCtrl.create({
                            header: 'None Found',
                            message: 'No past shifts were found in the database!',
                            buttons: ['OK']
                        });
                        await alert.present();
                    }
                })
            );
    }

    onLoadPastShifts() {
        this.loadPastShifts().subscribe((data: ScheduledShift []) => this.shifts = data);
    }

    loadApprovedShifts(): Observable<ScheduledShift [] | ShiftTrackerError> {
        return this.shiftsService.loadAllUpcomingApprovedShifts()
            .pipe(
                tap(async (res) => {
                    if (!(res instanceof ShiftTrackerError) && res.length === 0) {
                        const alert = await this.alertCtrl.create({
                            header: 'None Found',
                            message: 'No upcoming "approved" shifts were found in the database!',
                            buttons: ['OK']
                        });
                        await alert.present();
                    }
                })
            );
    }

    onLoadApprovedShifts() {
        this.loadApprovedShifts().subscribe((data: ScheduledShift[]) => this.shifts = data);
    }

    loadPendingShifts(): Observable<ScheduledShift [] | ShiftTrackerError> {
        return this.shiftsService.loadAwaitingApprovalShifts()
            .pipe(
                tap(async (res) => {
                    if (!(res instanceof ShiftTrackerError) && res.length === 0) {
                        const alert = await this.alertCtrl.create({
                            header: 'None Found',
                            message: 'No upcoming "pending approval" shifts were found in the database!',
                            buttons: ['OK']
                        });
                        await alert.present();
                    }
                })
            );
    }

    onLoadPendingShifts() {
        this.loadPendingShifts().subscribe((data: ScheduledShift[]) => this.shifts = data);
    }

    loadLiveShifts(): Observable<ScheduledShift [] | ShiftTrackerError> {
        return this.shiftsService.loadLiveShifts()
            .pipe(
                tap(async (res) => {
                    if (!(res instanceof ShiftTrackerError) && res.length === 0) {
                        const alert = await this.alertCtrl.create({
                            header: 'None Found',
                            message: 'No "live" shifts were found in the database!',
                            buttons: ['OK']
                        });
                        await alert.present();
                    }
                })
            );
    }

    onLoadLiveShifts() {
        this.loadLiveShifts().subscribe((data: ScheduledShift[]) => this.shifts = data);
    }

    loadPendingPrimary(): Observable<ScheduledShift [] | ShiftTrackerError> {
        return this.shiftsService.loadUpcomingPendingPrimaryShifts()
            .pipe(
                tap(async (res) => {
                    if (!(res instanceof ShiftTrackerError) && res.length === 0) {
                        const alert = await this.alertCtrl.create({
                            header: 'None Found',
                            message: 'No upcoming "pending primary" shifts were found in the database!',
                            buttons: ['OK']
                        });
                        await alert.present();
                    }
                })
            );
    }

    onLoadPendingPrimary() {
        this.loadPendingPrimary().subscribe((data: ScheduledShift[]) => this.shifts = data);
    }

    loadPendingSecondary(): Observable<ScheduledShift [] | ShiftTrackerError> {
        return this.shiftsService.loadUpcomingPendingSecondaryShifts()
            .pipe(
                tap(async (res) => {
                    if (!(res instanceof ShiftTrackerError) && res.length === 0) {
                        const alert = await this.alertCtrl.create({
                            header: 'None Found',
                            message: 'No upcoming "pending secondary" shifts were found in the database!',
                            buttons: ['OK']
                        });
                        await alert.present();
                    }
                })
            );
    }

    onLoadPendingSecondary() {
        this.loadPendingSecondary().subscribe((data: ScheduledShift[]) => this.shifts = data);
    }


    loadApprovedPrimary(): Observable<ScheduledShift[] | ShiftTrackerError> {
        return this.shiftsService.loadUpcomingApprovedPrimaryShifts()
            .pipe(
                tap(async (res) => {
                    if (!(res instanceof ShiftTrackerError) && res.length === 0) {
                        const alert = await this.alertCtrl.create({
                            header: 'None Found',
                            message: 'No upcoming "approved primary" shifts were found in the database!',
                            buttons: ['OK']
                        });
                        await alert.present();
                    }
                })
            );
    }

    onLoadApprovedPrimary() {
        this.loadApprovedPrimary().subscribe((data: ScheduledShift[]) => this.shifts = data);
    }

    loadApprovedSecondary(): Observable<ScheduledShift[] | ShiftTrackerError> {
        return this.shiftsService.loadUpcomingApprovedSecondaryShifts()
            .pipe(
                tap(async (res) => {
                    if (!(res instanceof ShiftTrackerError) && res.length === 0) {
                        const alert = await this.alertCtrl.create({
                            header: 'None Found',
                            message: 'No upcoming approved shifts were found in the database!',
                            buttons: ['OK']
                        });
                        await alert.present();
                    }
                })
            );
    }

    onLoadApprovedSecondary() {
        this.loadApprovedSecondary().subscribe((data: ScheduledShift[]) => this.shifts = data);
    }


}
