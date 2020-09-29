import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import {ScheduledShift} from '../../models/scheduledshift.model';

@Component({
  selector: 'app-shift-details',
  templateUrl: './shift-details.component.html',
  styleUrls: ['./shift-details.component.scss'],
})
export class ShiftDetailsComponent implements OnInit {

  @Input()shifts: ScheduledShift[];
  constructor() { }

  ngOnInit() {}

}
