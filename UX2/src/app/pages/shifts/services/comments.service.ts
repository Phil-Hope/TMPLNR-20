import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {format} from "date-fns";
import {CommentsTrackerError} from "./comments-errors.provider";
import {HttpClient, HttpParams, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {ScheduledShift} from "../../../interfaces/shifts.interface";
import {ShiftComments} from "../../../interfaces/shift-comments.interface";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  shift: Observable<ScheduledShift>;
  shifts: Observable<ScheduledShift[]>;
  comment: Observable<ShiftComments>;
  comments: Observable<ShiftComments[]>;
  date = new Date();

  constructor(private http: HttpClient) { }

  loadAllComments(): Observable<ShiftComments[] | CommentsTrackerError> {
    return this.http.get<ShiftComments[]>(`${environment.apiUrl}/comments.json`,
      {headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true
      }).pipe(
        tap(_ => console.log('Comments Retrieved Successfully')),
      catchError(err => this.handleHttpError(err))
    );
  }

  loadCommentsForUpcomingShifts(): Observable<ShiftComments[] | CommentsTrackerError> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss'));
    return this.http.get<ShiftComments[]>(`${environment.apiUrl}/comments.json`,
      {params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true
      }).pipe(
      tap(_ => console.log('Comments Retrieved Successfully')),
      catchError(err => this.handleHttpError(err))
    );
  }

  getCommentById(comment: ShiftComments): Observable<ShiftComments | CommentsTrackerError> {
    return this.http.get<ShiftComments>(`${environment.apiUrl}/comments/${comment.id}.json`,
      {headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true
      }).pipe(
      tap(_ => console.log(`Shift: ${comment.id} Retrieved Successfully!`)),
      catchError(err => this.handleHttpError(err))
    );
  }

  getCommentsForShift(id: string): Observable<ShiftComments[] | CommentsTrackerError> {
    const params = new HttpParams()
      .set('dateOfComment', 'desc');
    return this.http.get<ShiftComments[]>(`${environment.apiUrl}/shifts/${id}/comments.json`,
      {params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true
      }).pipe(
        tap(_ => console.log('Shift comments loaded!')),
      catchError(err => this.handleHttpError(err))
    );
  }

  getUsersComments(id: string): Observable<ShiftComments[] | CommentsTrackerError> {
    return this.http.get<ShiftComments[]>(`${environment.apiUrl}/users/${id}/comments`,
      {headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true
      }).pipe(
        tap(_ => console.log(`Shifts for user: ${id} Retrieved successfully!`)),
      catchError(err => this.handleHttpError(err))
    );
  }

  addComment(comment: ShiftComments): Observable<ShiftComments | CommentsTrackerError> {
    return this.http.post<ShiftComments>(`${environment.apiUrl}/comments`,
      {
        comment: comment.comment,
        authoredBy: `/users/${comment.authoredBy}`,
        dateOfComment: comment.dateOfComment,
        shift: `/shifts/${comment.shift}`
      }, {headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true
      }).pipe(
      tap(_ => console.log('Comment Edited Successfully!')),
      catchError(err => this.handleHttpError(err))
    );
  }

  editComment(comment: ShiftComments): Observable<ShiftComments | CommentsTrackerError> {
    return this.http.put<ShiftComments>(`${environment.apiUrl}/comments/${comment.id}`,
      {
        comment: comment.comment,
        authoredBy: comment.authoredBy,
        dateOfComment: comment.dateOfComment,
        shift: comment.shift
      }, {headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true
    }).pipe(
      tap(_ => console.log('Comment Edited Successfully!')),
      catchError(err => this.handleHttpError(err))
    );
  }

  deleteComment(comment: ShiftComments): Observable<ShiftComments | CommentsTrackerError> {
     return this.http.delete<ShiftComments>(`${environment.apiUrl}/comments/${comment.id}`,
       {headers: new HttpHeaders({
           'Content-Type': 'application/json'
         }), withCredentials: true
       }).pipe(
         tap(_ => console.log('Comment Delete Successfully!')),
       catchError(err => this.handleHttpError(err))
     );
  }

  handleHttpError(error: HttpErrorResponse): Observable<CommentsTrackerError> {
    const dataError = new CommentsTrackerError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'Oops! an error occurred while trying to retrieve shift comments data.';
    return throwError(dataError);
  }
}
