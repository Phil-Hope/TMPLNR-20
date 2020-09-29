import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ShiftComments} from '../models/shiftcomments.model';
import {Observable, of} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  API_URL = 'https://localhost:8000/api/shift_comments/';
  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  fetchAllComments(): Observable<ShiftComments[]> {
    return this.http.get<ShiftComments[]>(`https://localhost:8000/api/shift_comments/`,
      {headers: new HttpHeaders({
          'Content-Type': 'application/ld+json'
        })
      })
      .pipe(
        tap(comment => console.log('Fetched Comments')),
        catchError(this.handleError<ShiftComments[]>('fetch comments'))
      );
  }

  fetchComment(comment: ShiftComments): Observable<ShiftComments[]> {
    return this.http.get<ShiftComments[]>(`https://localhost:8000/api/shift_comments/${comment['@id']}`,
      {headers: new HttpHeaders({
          'Content-Type': 'application/ld+json'
        })
      })
      .pipe(
        tap(_ => console.log('Comment Fetched')),
        catchError(this.handleError<ShiftComments[]>('Get comment'))
      );
  }

  editComment(updatedComment: ShiftComments): Observable<void> {
    return this.http.put<void>(`https://localhost:8000/api/shift_comments/${updatedComment['@id']}`, {updatedComment},
      {headers: new HttpHeaders({
          'Content-Type': 'application/ld+json'
        })
      })
      .pipe(
        tap(_ => console.log('Comment Updated')),
          catchError(this.handleError<void>('edit comment'))
      );
  }

  deleteComment(deletedComment: ShiftComments): Observable<void> {
    return this.http.delete<void>(`https://localhost:8000/api/shift_comments/${deletedComment['@id']}`,
      {headers: new HttpHeaders({
          'Content-Type': 'application/ld+json'
        })
      })
      .pipe(
        tap(_ => console.log('comment deleted')),
        catchError(this.handleError<void>('delete comment'))
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
