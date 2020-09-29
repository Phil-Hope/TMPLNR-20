import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ScheduledShift} from '../models/scheduledshift.model';
import {Observable} from 'rxjs';
import {ShiftService} from './shift.service';

@Injectable()
export class ShiftsResolver implements Resolve<ScheduledShift> {
  constructor(private shiftsService: ShiftService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ScheduledShift> {
    return this.shiftsService.findShiftById(route.params.id);
  }
}
