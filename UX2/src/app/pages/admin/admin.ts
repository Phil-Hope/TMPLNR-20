import { Component, OnInit } from '@angular/core';
import {ShiftsService} from "../shifts/services/shifts.service";
import {Observable} from "rxjs";
import {ScheduledShift} from "../../interfaces/shifts.interface";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss']
})

export class AdminPage implements OnInit {

  pendingShifts: ScheduledShift[];
  shifts: Observable<ScheduledShift>;
  isApproved = true;
  constructor(private shiftService: ShiftsService) {
  }

  ngOnInit() {
    this.loadShiftsAwaitingApproval().subscribe(data => this.pendingShifts = data);
  }

  loadShiftsAwaitingApproval(): Observable<ScheduledShift[]> {
    return this.shiftService.loadAwaitingApprovalShifts();
  }
}
