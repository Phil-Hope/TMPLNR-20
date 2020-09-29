import {Component, ViewChild, OnInit} from '@angular/core';
import {ShiftService} from '../../services';
import {ScheduledShift} from '../../models/scheduledshift.model';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
})
export class MyCalendarComponent implements OnInit {
  @ViewChild("calendar")

  shifts: ScheduledShift[] = [];
  shift: ScheduledShift;

  constructor(private shiftsService: ShiftService) {
  }

  ngOnInit() {
    this.getShifts();
  }

  getShifts() {
    this.shiftsService.findAllShifts().subscribe(data => {
    });
  }

}
