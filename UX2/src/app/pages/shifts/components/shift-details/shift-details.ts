import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {ShiftsService} from "../../services/shifts.service";

@Component({
  selector: 'app-shift-details',
  templateUrl: './shift-details.html',
  styleUrls: ['./shift-details.scss'],
})
export class ShiftDetailsPage implements OnInit {

  shift: ScheduledShift;
  shift$: Observable<ScheduledShift>;
  date = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shiftsService: ShiftsService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getShift(id).subscribe((data: ScheduledShift) => this.shift = data);
  }

  getShift(id: string): Observable<ScheduledShift> {
   return this.shiftsService.getShiftById(id);
  }

}
