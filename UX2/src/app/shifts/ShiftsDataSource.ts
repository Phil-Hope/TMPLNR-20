import {ShiftService} from '../services';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {ScheduledShift} from '../models/scheduledshift.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';


export class ShiftsDataSource implements DataSource<ScheduledShift> {

  private shiftSubject = new BehaviorSubject<ScheduledShift[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private shiftService: ShiftService) {
  }

  loadShifts(shiftId: string,
             filter: string,
             sortDirection: string,
             pageIndex: number,
             pageSize: number) {

    this.loadingSubject.next(true);

    this.shiftService.findShifts(shiftId, filter, sortDirection,
      pageIndex, pageSize)
      .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(shifts => this.shiftSubject.next(shifts));
  }

  connect(collectionViewer: CollectionViewer): Observable<ScheduledShift[]> {
    console.log("Connecting data source");
    return this.shiftSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.shiftSubject.complete();
    this.loadingSubject.complete();
  }
}
