import { Component, OnInit } from '@angular/core';
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";

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
    private fb: FormBuilder) {
    this.form = this.fb.group({
      start: [''],
      end: [''],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.shiftsService.getShiftById(id)
      .subscribe((data: ScheduledShift) => this.shift = data);
  }

  onEditShift(id: string) {
    if (this.form.valid) {
      if (this.form.dirty) {
        const fd = { ...this.shift, ...this.form.value };
        this.shiftsService.editShift(fd)
          .subscribe((data) => console.log(JSON.stringify(data)));
      }
    }
  }
}
