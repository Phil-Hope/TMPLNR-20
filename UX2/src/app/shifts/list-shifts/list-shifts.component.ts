import {Component, OnInit} from '@angular/core';
import {ShiftService} from '../../services';
import {ActivatedRoute} from '@angular/router';
import {ScheduledShift} from '../../models/scheduledshift.model';

@Component({
  selector: 'app-list-shifts',
  templateUrl: './list-shifts.component.html',
  styleUrls: ['./list-shifts.component.scss'],
})
export class ListShiftsComponent implements OnInit {

  shifts: ScheduledShift[] = [];
  shift: ScheduledShift;

  constructor(private shiftServices: ShiftService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

     this.shiftServices.findAllShifts()
       .subscribe(
         (response) =>
         {
           this.shifts = response;
         }
       );

  }
}
