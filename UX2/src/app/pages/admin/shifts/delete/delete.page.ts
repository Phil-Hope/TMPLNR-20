import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ShiftsService} from "../../../shifts/services/shifts.service";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {

  shift: ScheduledShift;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shiftsService: ShiftsService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.shiftsService.getShiftById(id)
      .subscribe((data: ScheduledShift) => this.shift = data);
  }

  onDeleteShift(id: string) {
    this.shiftsService.deleteShift(id)
      .pipe(
        tap(_ => alert('Shift deleted!')),
        tap(_ => this.router.navigateByUrl('/admin/shifts/list'))
      )
      .subscribe((data) => console.log(JSON.stringify(data)));
  }

}
