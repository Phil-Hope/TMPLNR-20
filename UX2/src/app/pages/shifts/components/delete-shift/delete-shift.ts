import {Component, OnInit} from '@angular/core';
import {ScheduledShift} from '../../../../interfaces/shifts.interface';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShiftsService} from "../../services/shifts.service";
import {ShiftTrackerError} from "../../services/shifts-errors.interface";
import {tap, map} from 'rxjs/operators';
import {Observable} from "rxjs";
@Component({
    selector: 'app-delete-shift',
    templateUrl: './delete-shift.html',
    styleUrls: ['./delete-shift.scss'],
})
export class DeleteShiftPage implements OnInit {

    shift: ScheduledShift | ShiftTrackerError;
    form: FormGroup;
    id: string;
    date = new Date();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private shiftService: ShiftsService,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {

        setInterval(() => {
        this.date = new Date();
      }, 1000);
    }

    getShiftToDisplay(): Observable<any> {
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id');
      });
    return this.shiftService.getShiftById(this.id);
    }

    onSubmitDeleteShift() {
      if (this.form.valid){
        const f = { ...this.shift, ...this.form.value };
        this.shiftService.deleteShift(f)
          .pipe(
           tap(_ => this.router.navigateByUrl('/shifts'))
      ).subscribe(data => console.log(data));
      }
    }

}
