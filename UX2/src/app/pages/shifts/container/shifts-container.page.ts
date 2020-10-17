import { Component, OnInit } from '@angular/core';
import {ShiftsService} from "../services/shifts.service";
import {ScheduledShift} from "../../../interfaces/shifts.interface";

@Component({
  selector: 'app-container',
  templateUrl: './shifts-container.page.html',
  styleUrls: ['./shifts-container.page.scss'],
})
export class ContainerPage implements OnInit {

  shifts: ScheduledShift[];
  isLoading = true;

  constructor(private shiftsService: ShiftsService) { }

  ngOnInit() {
    this.shiftsService.loadLiveShifts()
      .subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

}
