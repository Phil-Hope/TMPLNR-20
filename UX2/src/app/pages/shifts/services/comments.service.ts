import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs/operators";
import {format} from "date-fns";
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {ScheduledShift} from "../../../interfaces/shifts.interface";
import {ShiftComments} from "../../../interfaces/shift-comments.interface";
import * as moment from "moment";
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  shift: Observable<ScheduledShift>;
  shifts: Observable<ScheduledShift[]>;
  comment: Observable<ShiftComments>;
  comments: Observable<ShiftComments[]>;
  date = new Date();

  constructor(private http: HttpClient) {
  }

  loadAllComments(): Observable<ShiftComments[]> {
    return this.http.get<ShiftComments[]>(`${environment.apiUrl}/comments.json`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log('Comments Retrieved Successfully'))
    );
  }

  loadCommentsForUpcomingShifts(): Observable<ShiftComments[]> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss'));
    return this.http.get<ShiftComments[]>(`${environment.apiUrl}/comments.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log('Comments Retrieved Successfully'))
    );
  }

  getCommentById(id: string): Observable<ShiftComments> {
    return this.http.get<ShiftComments>(`${environment.apiUrl}/comments/${id}.json`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shift: ${id} Retrieved Successfully!`))
    );
  }

  markAsRead(id: string): Observable<ShiftComments>{
    return this.http.put<ShiftComments>(`${environment.apiUrl}/comments/${id}`,
      {markedAsRead: true}, {headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    }).pipe(
      tap(_ => console.log('Message marked as Read!'))
    );
  }

  getCommentsForShift(id: string): Observable<ShiftComments[]> {
    const params = new HttpParams()
      .set('dateOfComment', 'desc');
    return this.http.get<ShiftComments[]>(`${environment.apiUrl}/shifts/${id}/comments.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log('Shift comments loaded!'))
    );
  }

  getUsersComments(id: string): Observable<ShiftComments[]> {
    return this.http.get<ShiftComments[]>(`${environment.apiUrl}/users/${id}/comments`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts for user: ${id} Retrieved successfully!`))
    );
  }

  getUsersReceivedComments(id: string): Observable<ShiftComments[]> {
    return this.http.get<ShiftComments[]>(`${environment.apiUrl}/users/${id}/received_comments.json`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`received comments for user ${id} fetched successfully!`))
    );
  }

  getUsersUnreadComments(id: string): Observable<ShiftComments[]> {
    const params = new HttpParams()
      .set('markedAsRead', 'false');
    return this.http.get<ShiftComments[]>(`${environment.apiUrl}/users/${id}/received_comments.json`,
      {
        params,
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`received comments for user ${id} fetched successfully!`))
    );
  }

  getUsersReadComments(id: string): Observable<ShiftComments[]> {
    const params = new HttpParams()
      .set('markedAsRead', 'true');
    return this.http.get<ShiftComments[]>(`${environment.apiUrl}/users/${id}/received_comments.json`,
      {
        params,
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`received comments for user ${id} fetched successfully!`))
    );
  }

  addComment(comment: ShiftComments): Observable<ShiftComments> {
    return this.http.post<ShiftComments>(`${environment.apiUrl}/comments`,
      {
        comment: comment.comment,
        subject: comment.subject,
        authoredBy: `/users/${comment.authoredBy}`,
        dateOfComment: moment(comment.dateOfComment).toDate(),
        markedAsRead: false,
        isPrivate: false,
        shift: `/shifts/${comment.shift}`,
        recipient: comment.recipient
      }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log('Comment Edited Successfully!'))
    );
  }

  sendMessage(comment: ShiftComments): Observable<ShiftComments> {
    return this.http.post<ShiftComments>(`${environment.apiUrl}/comments`,
      {
        comment: comment.comment,
        subject: comment.subject,
        markedAsRead: false,
        isPrivate: true,
        authoredBy: `/users/${comment.authoredBy}`,
        dateOfComment: moment(comment.dateOfComment).toDate(),
        recipient: `/users/${comment.recipient}`
      }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log('Comment Edited Successfully!'))
    );
  }

  editComment(comment: ShiftComments): Observable<ShiftComments> {
    return this.http.put<ShiftComments>(`${environment.apiUrl}/comments/${comment.id}`,
      {
        comment: comment.comment,
        authoredBy: comment.authoredBy,
        shift: comment.shift,
        recipient: comment.recipient
      }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Comment: ${comment.id} Edited Successfully!`))
    );
  }

  deleteComment(id: string): Observable<ShiftComments> {
    return this.http.delete<ShiftComments>(`${environment.apiUrl}/comments/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Comment: ${id} Delete Successfully!`))
    );
  }
}
