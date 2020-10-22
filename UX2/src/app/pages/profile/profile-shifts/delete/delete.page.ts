import {Component, OnInit} from '@angular/core';
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {

  shift: ScheduledShift;

  constructor(
    private shiftsService: ShiftsService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.shiftsService.getShiftById(id)
      .subscribe((data) => this.shift = data);
  }

  onDeleteShift(id: string) {
    this.shiftsService.deleteShift(id)
      .subscribe((data) => console.log(JSON.stringify(data)));
  }

}
