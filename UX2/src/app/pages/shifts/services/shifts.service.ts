import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {ScheduledShift} from "../../../interfaces/shifts.interface";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {format} from "date-fns";
import {ShiftTrackerError} from "./shifts-errors.provider";
import moment from "moment";


@Injectable()
export class ShiftsService {

  shift: Observable<ScheduledShift>;
  shifts: Observable<ScheduledShift[]>;
  date = new Date();

  constructor(private http: HttpClient) {
  }

  loadAllShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
    const params = new HttpParams()
      .set('order[start]', 'asc');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => console.log('Shifts Fetched Successfully!')),
      catchError(err => this.handleHttpError(err))
    );
  }

  loadLiveShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
    const params = new HttpParams()
      .set('start[before]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('end[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss'));
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      {params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
        tap(_ => console.log('Fetched live shifts')),
      catchError(err => this.handleHttpError(err))
    );
  }

   loadAllUpcomingShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss')
      )
      .set('order[start]', 'asc');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
        {
          params, headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        }).pipe(
        tap(_ => console.log('Fetched Upcoming Shifts Successfully!')),
      catchError(err => this.handleHttpError(err))
      );
  }

  loadAllPastShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
    const params = new HttpParams()
      .set('start[before]', format(this.date, 'yyyy-MM-dd HH:mm:ss')
      )
      .set('order[start]', 'asc');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => console.log('Fetched Upcoming Shifts Successfully!')),
      catchError(err => this.handleHttpError(err))
    );
  }

  loadAwaitingApprovalShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss')
      )
      .set('order[start]', 'asc')
      .set('isApproved', 'false');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => console.log('Fetched Awaiting Approval Shifts Successfully!')),
      catchError(err => this.handleHttpError(err))
    );
  }

  loadAllUpcomingApprovedShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss')
      )
      .set('order[start]', 'asc')
      .set('isApproved', 'true');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => console.log('Fetched Awaiting Approval Shifts Successfully!')),
      catchError(err => this.handleHttpError(err))
    );
  }

  loadAllUpcomingPrimaryShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss')
      )
      .set('order[start]', 'asc')
      .set('ShiftStatus', 'primary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => console.log('Fetched Awaiting Approval Shifts Successfully!')),
      catchError(err => this.handleHttpError(err))
    );
  }

  loadAllUpcomingSecondaryShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss')
      )
      .set('order[start]', 'asc')
      .set('ShiftStatus', 'secondary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }), withCredentials: true
      }).pipe(
      tap(_ => console.log('Fetched Awaiting Approval Shifts Successfully!')),
      catchError(err => this.handleHttpError(err))
    );
  }

  loadUpcomingPendingSecondaryShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss')
      )
      .set('order[start]', 'asc')
      .set('isApproved', 'false')
      .set('ShiftStatus', 'secondary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => console.log('Fetched Awaiting Approval Shifts Successfully!')),
      catchError(err => this.handleHttpError(err))
    );
  }

  loadUpcomingPendingPrimaryShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss')
      )
      .set('order[start]', 'asc')
      .set('isApproved', 'false')
      .set('ShiftStatus', 'primary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => console.log('Fetched Awaiting Approval Shifts Successfully!')),
      catchError(err => this.handleHttpError(err))
    );
  }

  loadUpcomingApprovedPrimaryShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss')
      )
      .set('order[start]', 'asc')
      .set('isApproved', 'true')
      .set('ShiftStatus', 'primary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => console.log('Fetched Awaiting Approval Shifts Successfully!')),
      catchError(err => this.handleHttpError(err))
    );
  }

  loadUpcomingApprovedSecondaryShifts(): Observable<ScheduledShift[] | ShiftTrackerError> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss')
      )
      .set('order[start]', 'asc')
      .set('isApproved', 'true')
      .set('ShiftStatus', 'secondary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => console.log('Fetched Awaiting Approval Shifts Successfully!')),
      catchError(err => this.handleHttpError(err))
    );
  }


  getShiftById(id: string): Observable<ScheduledShift | ShiftTrackerError> {
    return this.http.get<ScheduledShift>(`${environment.apiUrl}/shifts/${id}.json`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => console.log('Shift Fetched Successfully')),
      catchError(err => this.handleHttpError(err))
    );
  }

  approveShift(shift: ScheduledShift): Observable<ScheduledShift | ShiftTrackerError> {
    return this.http.put<ScheduledShift>(`${environment.apiUrl}/shifts/${shift.id}`,
      {start: shift.start,
            end: shift.end,
            onDuty: shift.onDuty,
            ShiftStatus: shift.ShiftStatus,
            isApproved: shift.isApproved
      },
      {headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
        tap(_ => alert(`Shift ${shift.id} has been approved!`)),
        tap(data => console.log('approve shift: ' + JSON.stringify(data))),
        catchError(err => this.handleHttpError(err))
    );
  }

  addShift(shift: ScheduledShift): Observable<ScheduledShift | ShiftTrackerError> {
    return this.http.post<ScheduledShift>(`${environment.apiUrl}/shifts`,
      {
        start: shift.start,
        end:  shift.end,
        onDuty: shift.onDuty,
        ShiftStatus: shift.ShiftStatus,
        isApproved: shift.isApproved},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => alert('Shift Created Successfully!')),
      tap(data => console.log('create shift: ' + JSON.stringify(data)),
      catchError(err => this.handleHttpError(err)))
    );
  }

  editShift(shift: ScheduledShift): Observable<ScheduledShift | ShiftTrackerError> {
    return this.http.put<ScheduledShift>(`${environment.apiUrl}/shifts/${shift.id}`,
      {
        start: shift.start,
        end: shift.end,
        onDuty: shift.onDuty,
        ShiftStatus: shift.ShiftStatus,
        isApproved: shift.isApproved
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      })
      .pipe(
        tap(_ => alert('Shift Edited Successfully!')),
        tap(data => console.log('shifts edited: ' + JSON.stringify(data))),
        catchError(err => this.handleHttpError(err))
      );
  }

  deleteShift(shift: ScheduledShift): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/shifts/${shift.id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => alert(`Shift: ${shift.id}, Deleted SuccessFully!`)),
      tap(data => console.log('delete shift: ' + JSON.stringify(data))),
      catchError(async (err) => console.log(`an error occurred: ${err}`))
    );
  }

   handleHttpError(error: HttpErrorResponse): Observable<ShiftTrackerError> {
    const dataError = new ShiftTrackerError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'Oops! an error occurred while trying to retrieve shift data.';
    return throwError(dataError);
  }
}
