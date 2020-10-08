import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ScheduledShift} from '../../../../../interfaces/shifts.interface';
import {Observable} from "rxjs";
import {NavController, NavParams} from "@ionic/angular";
import {ModalController} from "@ionic/angular";
import {ShiftsService} from "../../../services/shifts.service";
import {ShiftTrackerError} from "../../../services/shifts-errors.interface";


@Component({
  selector: 'app-list-shifts',
  templateUrl: './list-shifts.html',
  styleUrls: ['./list-shifts.scss'],
})
export class ListShiftsPage implements OnInit {

  shifts: ScheduledShift[] | ShiftTrackerError;

  selectedShift: ScheduledShift;

   constructor(
    private router: RouterLink,
    private shiftService: ShiftsService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController
  ) {
  }

  onSelect(shift: ScheduledShift): void {
    this.selectedShift = shift;
  }

  ngOnInit() {
    this.shiftService.loadAllUpcomingShifts().subscribe(data => this.shifts = data);
}
}
