import { Component, OnInit } from '@angular/core';
import {ShiftService} from '../../services';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScheduledShift} from '../../models/scheduledshift.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-shift',
  templateUrl: './edit-shift.component.html',
  styleUrls: ['./edit-shift.component.scss'],
})
export class EditShiftComponent implements OnInit {

  selectedShift: ScheduledShift;
  pageTitle: 'Edit Shift';

  constructor(private shiftService: ShiftService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
  }

  updateShift(): void {
    this.shiftService.updateShift(this.selectedShift)
      .subscribe(
        (data: void) => console.log(`${this.selectedShift.start} ${this.selectedShift.end} updated successfully.`),
        (err: any) => console.log(err)
      );
  }

}
