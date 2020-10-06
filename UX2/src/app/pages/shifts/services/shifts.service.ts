import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {ScheduledShift} from "../../../interfaces/shifts.interface";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {map, tap} from "rxjs/operators";
import {format} from "date-fns";

@Injectable()
export class ShiftsService {

  shift: Observable<ScheduledShift>;
  shifts: Observable<ScheduledShift[]>;
  date = new Date();

  constructor(private http: HttpClient) {
  }

  loadAllShifts(): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('order[start]', 'ASC');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }), withCredentials: true
      }).pipe(
      map((data: ScheduledShift[]) => data),
      tap(_ => console.log('Shifts Fetched Successfully!'))
    );
  }

   loadUpcomingShifts(): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss')
      )
      .set('order[start]', 'ASC');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
        {
          params, headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        }).pipe(
        map((data: ScheduledShift[]) => data),
        tap(_ => console.log('Fetched Upcoming Shifts Successfully!'))
      );
  }

  loadAwaitingApprovalShifts(): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss')
      )
      .set('order[start]', 'ASC')
      .set('isApproved', 'false');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      map((data: ScheduledShift[]) => data),
      tap(_ => console.log('Fetched Awaiting Approval Shifts Successfully!'))
    );
  }

  getShiftById(id: string): Observable<ScheduledShift> {
    return this.http.get<ScheduledShift>(`${environment.apiUrl}/shifts/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      map((data: ScheduledShift) => data),
      tap(_ => console.log('Shift Fetched Successfully'))
    );
  }

  approveShift(id: string, isApproved: boolean): Observable<ScheduledShift> {
    return this.http.put<ScheduledShift>(`${environment.apiUrl}/shifts/${id}`,
      {id, isApproved},
      {headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
        tap(_ => alert(`Shift ${id} has been approved!`))
    );
  }

  addShift(start: Date, end: Date, onDuty: string, ShiftStatus: string, isApproved: boolean): Observable<ScheduledShift> {
    return this.http.post<ScheduledShift>(`${environment.apiUrl}/shifts`,
      {start, end, onDuty, ShiftStatus, isApproved},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      map((data: ScheduledShift) => data),
      tap(_ => alert('Shift Created Successfully!'))
    );
  }

  editShift(id: string, start: Date, end: Date, ShiftStatus: string, isApproved: boolean) {
    return this.http.put<ScheduledShift>(`${environment.apiUrl}/shifts/${id}`,
      {id, start, end, ShiftStatus, isApproved},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      })
      .pipe(
        map((data: ScheduledShift) => data),
        tap(_ => alert('Shift Edited Successfully!'))
      );
  }

  deleteShift(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/shifts/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
      tap(_ => alert(`User: ${id}, Deleted SuccessFully!`))
    );
  }
}
