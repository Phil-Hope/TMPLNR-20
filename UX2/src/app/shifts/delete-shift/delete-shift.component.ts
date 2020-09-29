import { Component, OnInit } from '@angular/core';
import {ShiftService} from '../../services';
import {ScheduledShift} from '../../models/scheduledshift.model';

@Component({
  selector: 'app-delete-shift',
  templateUrl: './delete-shift.component.html',
  styleUrls: ['./delete-shift.component.scss'],
})
export class DeleteShiftComponent implements OnInit {

  selectedShift: ScheduledShift;
  pageTitle: 'Delete Shift';

  constructor(private shiftService: ShiftService) { }

  ngOnInit() {}

  deleteShift(): void {
    this.shiftService.deleteShift(this.selectedShift['@id'])
      .subscribe();
  }

}
