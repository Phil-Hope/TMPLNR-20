import {Component, OnInit} from '@angular/core';
import {ScheduledShift} from '../../../../interfaces/shifts.interface';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ShiftsService} from "../../services/shifts.service";
import {tap, map} from 'rxjs/operators';
@Component({
    selector: 'app-delete-shift',
    templateUrl: './delete-shift.html',
    styleUrls: ['./delete-shift.scss'],
})
export class DeleteShiftPage implements OnInit {

    shift: ScheduledShift;
    form: FormGroup;
    date = new Date();
    submitted = false;
    id: string;

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

      onSubmitDeleteShift(id: string) {
        this.submitted = true;
        this.shiftService.deleteShift(id)
             .pipe(
               map(_ => { this.router.navigateByUrl('/shifts'); }),
               tap(_ => console.log('shift deleted'))
             ).subscribe(data => data);
       }
}
