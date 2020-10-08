import {Component, OnInit} from "@angular/core";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {ShiftTrackerError} from "../../../shifts/services/shifts-errors.interface";
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-pending-approval-shifts',
  templateUrl: './pending-approval-shifts.html',
  styleUrls: ['./pending-approval-shifts.scss']
})
export class PendingApprovalShiftsPage implements OnInit {
  shifts: ScheduledShift[] | ShiftTrackerError;
  shift: ScheduledShift;
  date = new Date();

  constructor(private shiftService: ShiftsService) {
  }

  ngOnInit() {
    this.loadShiftsAwaitingApproval().subscribe(data => this.shifts = data);

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
  loadShiftsAwaitingApproval(): Observable<ScheduledShift[] | ShiftTrackerError> {
    return this.shiftService.loadAwaitingApprovalShifts();
  }
}
