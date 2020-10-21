import {Component, OnInit} from '@angular/core';
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  shift: ScheduledShift;
  form: FormGroup;

  constructor(
    private shiftsService: ShiftsService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: [''],
      start: [''],
      end: [''],
      onDuty: [''],
      ShiftStatus: [''],
      isApproved: ['']
    });
  }



  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.shiftsService.getShiftById(id)
      .subscribe((data: ScheduledShift) => this.shift = data);
  }

  onEditShift() {
    if (this.form.valid) {
      if (this.form.dirty) {
        const fd = {...this.shift, ...this.form.value};

        this.shiftsService.editShift(fd)
          .pipe(
            tap(_ => alert('Shift edited!'))
          ).subscribe((data) => console.log(JSON.stringify(data)));
      }
    }
  }

}
