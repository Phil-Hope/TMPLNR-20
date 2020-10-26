import { Component, OnInit } from '@angular/core';
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
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
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
    ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      ShiftStatus: ['', Validators.required],
      isApproved: [false],
      onDuty: ['', Validators.required]
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
        const fd = { ...this.shift, ...this.form.value };
        this.shiftsService.editShift(fd)
          .pipe(
            tap(_ => this.router.navigateByUrl(`/shifts/${_.id}/details`))
          )
          .subscribe((data) => console.log(JSON.stringify(data)));
      }
    }
  }
}
