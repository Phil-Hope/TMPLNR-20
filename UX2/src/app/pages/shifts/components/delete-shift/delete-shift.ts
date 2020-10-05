import { Component, OnInit } from '@angular/core';

import {ScheduledShift} from '../../../../interfaces/shifts.interface';
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-delete-shift',
  templateUrl: './delete-shift.html',
  styleUrls: ['./delete-shift.scss'],
})
export class DeleteShiftPage implements OnInit {

  selectedShift: ScheduledShift;
  pageTitle: 'Delete Shift';
  shift$: Observable<ScheduledShift>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
 //   private shiftService: ShiftService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
//    const shiftId = this.route.snapshot.paramMap.get('id');
//    this.shift$ = this.shiftService.findShiftById(shiftId);
  }

  goToShift(shift: ScheduledShift) {
    const shiftId = shift ? shift.id : null;

    this.router.navigate(['delete/', {id: shiftId}]).then(r => {});
  }

}
