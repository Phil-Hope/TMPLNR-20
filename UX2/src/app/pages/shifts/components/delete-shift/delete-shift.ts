import {Component, OnInit} from '@angular/core';
import {ScheduledShift} from '../../../../interfaces/shifts.interface';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShiftsService} from "../../services/shifts.service";
import {ShiftTrackerError} from "../../services/shifts-errors.provider";
import {tap, map} from 'rxjs/operators';
import {Observable} from "rxjs";
import {ToastController} from "@ionic/angular";
@Component({
    selector: 'app-delete-shift',
    templateUrl: './delete-shift.html',
    styleUrls: ['./delete-shift.scss'],
})
export class DeleteShiftPage implements OnInit {

    shift: ScheduledShift | ShiftTrackerError;
    form: FormGroup;
    date = new Date();
    submitted = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private shiftService: ShiftsService,
        private fb: FormBuilder,
    ) {
      this.form = this.fb.group({
        id: ['']
      });
    }

    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      this.shiftService.getShiftById(id).subscribe((data: ScheduledShift) => this.shift = data);

      setInterval(() => {
        this.date = new Date();
      }, 1000);
    }

  get f() { return this.form.controls; }

      onSubmitDeleteShift() {
        this.submitted = true;
        if (this.form.valid) {
           const f = {...this.shift, ...this.form.value};
           this.shiftService.deleteShift(f)
             .pipe(
               map(_ => { this.router.navigateByUrl('/shifts'); }),
               tap(_ => console.log('shift deleted'))
             ).subscribe(data => console.log(JSON.stringify(data)));
         }
       }

}
