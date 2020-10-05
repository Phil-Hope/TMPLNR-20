import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ScheduledShift} from '../../../../interfaces/shifts.interface';
import {Observable} from "rxjs";
import {NavController, NavParams} from "@ionic/angular";
import {ModalController} from "@ionic/angular";
import {ShiftsService} from "../../services/shifts.service";


@Component({
  selector: 'app-list-shifts',
  templateUrl: './list-shifts.html',
  styleUrls: ['./list-shifts.scss'],
})
export class ListShiftsPage implements OnInit {

  shifts$: Observable<ScheduledShift[]>;
  shifts: Observable<ScheduledShift[]>;
  shift: ScheduledShift;
  date = new Date();
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
    this.shifts = this.shiftService.loadUpcomingShifts();
    this.shiftService.loadUpcomingShifts().subscribe((data) => data);
  }

loadShifts(){
     this.shiftService.loadAllShifts().subscribe(data => data);
}

}
