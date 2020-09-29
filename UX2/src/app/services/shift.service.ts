import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import { ScheduledShift } from '../models/scheduledshift.model';
import { environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ShiftService {

  shift: Observable<ScheduledShift[]>;

  constructor(private http: HttpClient) {
  }

  updateShift(updatedShift: ScheduledShift): Observable<any> {
    return this.http.put(`${environment.apiUrl}/shifts/${updatedShift.id}`,
      {updatedShift},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      })
      .pipe(
        tap(_ => console.log(`shift updated: ${updatedShift.id}`)),
        catchError(this.handleError<ScheduledShift[]>('update shift'))
      );
  }

  findAllShifts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/shifts.json`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      })
      .pipe(tap(shift => console.log('Fetched Shifts Collection')),
        catchError(this.handleError<ScheduledShift[]>('Get User Collection'))
      );
  }

  addShift(start: Date, end: Date, onDuty: string, ShiftStatus: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/shifts`,
      {start, end, onDuty, ShiftStatus},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      }).pipe(
        tap(_ => alert(`shift created!`)),
      catchError(this.handleError<any>('add new shift'))
    );
  }

    findShiftById(shiftId: string): Observable<ScheduledShift> {
        return this.http.get<ScheduledShift>(`${environment.apiUrl}/${shiftId}`,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }), responseType: 'json',
            withCredentials: true
          })
          .pipe(
            tap(data => console.log(`fetched shift: ${data.id}`)),
            catchError(this.handleError<ScheduledShift>('fetch shift'))
          );
    }

    deleteShift(shiftId: string): Observable<ScheduledShift[]> {
    return this.http.delete<ScheduledShift[]>(`${environment.apiUrl}/shifts/${shiftId}`,
      { headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(
        tap(_ => this.handleError<ScheduledShift[]>('delete shift'))
      );
    }

  findShifts(shiftId: string,
             filter: string,
             sortOrder = 'asc',
             pageNumber: number,
             pageSize = 3): Observable<ScheduledShift[]> {

    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/shifts.json`,
      { headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true,
        responseType: 'json',
        params: new HttpParams()
          .set('shiftId', shiftId)
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
      })
      .pipe(
        tap(shifts => console.log('fetched shifts')),
        catchError(this.handleError<ScheduledShift[]>('get shifts')),
        map(res => res)
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
