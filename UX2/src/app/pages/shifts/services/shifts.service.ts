import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {ScheduledShift} from "../../../interfaces/shifts.interface";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs/operators";
import {format} from "date-fns";
import * as moment from "moment";


@Injectable()
export class ShiftsService {

  shift: Observable<ScheduledShift>;
  shifts: Observable<ScheduledShift[]>;
  date = moment(new Date()).toDate();

  constructor(private http: HttpClient) {
  }

  loadAllShifts(): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('order[start]', 'asc');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => console.log('Shifts Fetched Successfully!'))
    );
  }

  loadLiveShifts(): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[before]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('end[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss'));
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      {params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
        tap(_ => console.log('Fetched live shifts')),
    );
  }

   loadAllUpcomingShifts(): Observable<ScheduledShift[]> {
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
        tap(_ => console.log('Fetched All Upcoming Shifts Successfully!'))
      );
  }

  loadAllPastShifts(): Observable<ScheduledShift[]> {
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
      tap(_ => console.log('Fetched Past Shifts Successfully!')),
    );
  }

  loadAwaitingApprovalShifts(): Observable<ScheduledShift[]> {
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
    );
  }

  loadAllUpcomingApprovedShifts(): Observable<ScheduledShift[]> {
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
      tap(_ => console.log('Fetched Upcoming Approved Shifts Successfully!')),
    );
  }

  loadAllUpcomingPrimaryShifts(): Observable<ScheduledShift[]> {
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
      tap(_ => console.log('Fetched Upcoming "Primary" Shifts Successfully!')),
    );
  }

  loadAllUpcomingSecondaryShifts(): Observable<ScheduledShift[]> {
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
      tap(_ => console.log('Fetched Upcoming "Secondary" Shifts Successfully!')),
    );
  }

  loadUpcomingPendingSecondaryShifts(): Observable<ScheduledShift[]> {
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
      tap(_ => console.log('Fetched Pending Approval "Secondary" Shifts Successfully!'))
    );
  }

  loadUpcomingPendingPrimaryShifts(): Observable<ScheduledShift[]> {
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
      tap(_ => console.log('Fetched Pending Approval "Primary" Shifts Successfully!')),
    );
  }

  loadUpcomingApprovedPrimaryShifts(): Observable<ScheduledShift[]> {
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
      tap(_ => console.log('Fetched Upcoming Approved Primary Shifts Successfully!')),
    );
  }

  loadUpcomingApprovedSecondaryShifts(): Observable<ScheduledShift[]> {
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
      tap(_ => console.log('Fetched Upcoming Approved Secondary Shifts Successfully!')),
    );
  }

  getShiftById(id: string): Observable<ScheduledShift> {
    return this.http.get<ScheduledShift>(`${environment.apiUrl}/shifts/${id}.json`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => console.log('Shift Fetched Successfully'))
    );
  }

  approveShift(shift: ScheduledShift): Observable<ScheduledShift> {
    return this.http.put<ScheduledShift>(`${environment.apiUrl}/shifts/${shift.id}`,
      {
        start: moment(shift.start).toDate(),
        end:  moment(shift.end).toDate(),
        onDuty: shift.onDuty,
        ShiftStatus: shift.ShiftStatus,
        isApproved: shift.isApproved
      },
      {headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
        tap(_ => alert(`Shift ${shift.id} has been approved!`)),
        tap(data => console.log('approve shift: ' + JSON.stringify(data)))
    );
  }

  addShift(shift: ScheduledShift): Observable<ScheduledShift> {
    return this.http.post<ScheduledShift>(`${environment.apiUrl}/shifts`,
      {
        start: moment(shift.start).toDate(),
        end:  moment(shift.end).toDate(),
        onDuty: shift.onDuty,
        ShiftStatus: shift.ShiftStatus,
        isApproved: shift.isApproved},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => alert('Shift Created Successfully!')),
      tap(data => console.log('create shift: ' + JSON.stringify(data))
    ));
  }

  editShift(shift: ScheduledShift): Observable<ScheduledShift> {
    return this.http.put<ScheduledShift>(`${environment.apiUrl}/shifts/${shift.id}`,
      {
        start: moment(shift.start).toDate(),
        end:  moment(shift.end).toDate(),
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
        tap(data => console.log('shifts edited: ' + JSON.stringify(data)))
      );
  }

  deleteShift(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/shifts/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => alert(`Shift: ${id}, Deleted SuccessFully!`)),
      tap(data => console.log('delete shift: ' + JSON.stringify(data)))
    );
  }
}
